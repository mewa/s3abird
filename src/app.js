const Vue = require('vue');
const VueRouter = require('vue-router');
const Vuex = require('vuex');

const App = require('./App.vue');
const Email = require('./Email.vue');
const EmailList = require('./EmailList.vue');

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
    routes: [
        { path: '/', component: EmailList },
        { path: '/inbox', component: EmailList },
        { path: '/inbox/:messageId', component: Email, props: true }
    ]
});

const store = new Vuex.Store({
    state: {
        config: JSON.parse(localStorage.config || null),
        emails: new Map
    },
    mutations: {
        updateConfig(state, newConfig) {
            state.config = newConfig;

            localStorage.config = JSON.stringify(newConfig);
        },
        updateEmails(state, emails) {
            const map = new Map;
            emails.forEach(email => {
                map.set(email.key, email);
            });
            state.emails = map;
        },
        updateEmail(state, email) {
            state.emails.set(email.key, email);
        }
    }
});

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});
