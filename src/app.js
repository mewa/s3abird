const Vue = require('vue');
const VueRouter = require('vue-router');

const App = require('./App.vue');
const Email = require('./Email.vue');
const EmailList = require('./EmailList.vue');

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: EmailList },
        { path: '/inbox', component: EmailList },
        { path: '/inbox/:messageId', component: Email, props: true }
    ]
});

new Vue({
    router,
    el: '#app',
    render: h => h(App),
    data: {
        aws_region: 'redacted',
        aws_access_key_id: 'redacted',
        aws_secret_access_key: 'redacted',
        bucket: 'redacted'
    }
});
