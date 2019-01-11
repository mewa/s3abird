const Vue = require('vue');

const Email = require('./Email.vue');
const EmailList = require('./EmailList.vue');

new Vue({
    el: '#app',
    render: h => h(EmailList, {
        props: {
            access_key_id: 'redacted',
            secret_access_key: 'redacted',
            bucket: 'redacted'
        }
    })
});
