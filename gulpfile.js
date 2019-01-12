'use strict';

var browserify = require('browserify');
var vueify = require('vueify');
var gulp = require('gulp');
var Sass = require('gulp-sass');
var browsersync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var historyApiFallback = require('connect-history-api-fallback');
var mustache = require('gulp-mustache');

const parallel = gulp.parallel;
const series = gulp.series;

Sass.compiler = require('node-sass');

const OUTPUT = 'public';

const browserSync = (done) => {
    browsersync.init({
        server: {
            baseDir: './public',
            middleware: [
                historyApiFallback()
            ]
        },
        port: 3000
    });
    done();
};

const browserSyncReload = (done) => {
    browsersync.reload();
    done();
};

const js = () => {
    const b = browserify({
        entries: './src/app.js',
        transform: [vueify]
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(`${OUTPUT}/js`));
};

const sass = () => {
    return gulp.src('./scss/**/*.scss')
        .pipe(Sass().on('error', Sass.logError))
        .pipe(gulp.dest(`${OUTPUT}/css`));
};

const copyHtml = () => {
    return gulp.src('./static/**/*.html')
        .pipe(mustache({
            site_base: process.env.SITE_BASE || '/',
            ga: process.env.GA_TRACKING_ID
        }))
        .pipe(gulp.dest(OUTPUT));
};

const copyImg = () => {
    return gulp.src('./static/img/**/*')
        .pipe(gulp.dest(`${OUTPUT}/img`));
};

const copyFavicon = () => {
    return gulp.src('./static/favicon/**/*')
        .pipe(gulp.dest(`${OUTPUT}`));
};

const copyJs = () => {
    return gulp.src('./static/**/*.js')
        .pipe(gulp.dest(OUTPUT));
};

const copy = parallel(copyHtml, copyImg, copyFavicon, copyJs);

const watch = () => {
    gulp.watch('./static/**/*', series(copy, browserSyncReload));
    gulp.watch('./scss/**/*.scss', series(sass, browserSyncReload));
    gulp.watch('./src/**/*', series(js, browserSyncReload));
};

exports.copy = copy;
exports.js = js;
exports.sass = sass;

exports.default = parallel(copy, sass, js);

exports.watch = parallel(watch, browserSync);
