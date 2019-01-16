<template>
<div>
  <h4>Inbox</h4>
  <div class="alert alert-danger" v-if="error">
    Error: {{ error }}
  </div>
  <table class="table table-hover table-responsive-lg">
    <tbody>
      <tr v-for="email in emails" @click="openEmail(email)">
        <td class="text-truncate" style="max-width: 300px;">{{ email.from.text }}</td>
        <td class="text-truncate" style="width: 100%; min-width: 300px; max-width: 1px;">{{ email.subject }}</td>
        <td class="text-nowrap text-muted text-right"><small>{{ email.date.toLocaleString() }}</small></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
const AWS = require('aws-sdk');
const Promise = require('bluebird');
const parser = require('./parser.js');

AWS.config.setPromisesDependency(Promise);

function loadEmails() {
    AWS.config.accessKeyId = this.config.aws_access_key_id;
    AWS.config.secretAccessKey = this.config.aws_secret_access_key;

    const s3 = new AWS.S3({ region: this.config.aws_region });

    this.error = null;
    this.emails = [];

    s3.listObjectsV2({
        Bucket: this.config.bucket,
        Prefix: this.config.prefix
    }).promise()
        .then(r => r.Contents)
        .then(r => r.sort((a, b) => b.LastModified - a.LastModified))
        .map(item => s3.getObject({
            Bucket: this.config.bucket,
            Key: item.Key
        }).promise()
             .then(msg => {
                 return parser(msg.Body);
             })
             .then(parsed => {
                 parsed.key = Buffer.from(item.Key).toString('base64');
                 return parsed;
             })
            ).then(emails => {
                this.emails = emails;
            }).catch(e => {
                this.error = e;
            });
}

module.exports = {
    name: 'EmailList',
    data: function () {
        return {
            emails: [],
            error: null
        }
    },
    computed: {
        config: function () {
            return this.$store.state.config;
        }
    },
    methods: {
        openEmail: function (e) {
            this.$router.push({ path: `/inbox/${e.key}` });
        },
        loadEmails
    },
    created: function () {
        if (this.config) {
            this.loadEmails();
        }
    },
    watch: {
        config: function (val) {
            this.loadEmails();
        },
        emails: function (val) {
            this.$store.commit('updateEmails', val);
        }
    },
}
</script>

<style lang="scss" scoped>
.table {
    font-size: 0.875rem;

    tbody tr {
        cursor: pointer;

        .fill {
            width: auto;
        }
    }
}
</style>
