<template>
<div>
  <table class="table table-hover table-striped table-sm">
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">From</th>
        <th scope="col">Subject</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="email in emails" @click="openEmail(email)">
        <td>{{ email.date.toLocaleString() }}</td>
        <td>{{ email.from.text }}</td>
        <td>{{ email.subject }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
const AWS = require('aws-sdk');
const Promise = require('bluebird');
const simpleParser = require('mailparser').simpleParser;

AWS.config.setPromisesDependency(Promise);

function loadEmails() {
    AWS.config.accessKeyId = this.config.aws_access_key_id;
    AWS.config.secretAccessKey = this.config.aws_secret_access_key;

    const s3 = new AWS.S3({ region: this.config.aws_region });

    s3.listObjectsV2({
        Bucket: this.config.bucket
    }).promise()
        .then(r => {
            this.error = null;
            this.emails = [];
            return r.Contents;
        })
        .then(r => r.sort((a, b) => b.LastModified - a.LastModified))
        .map(item => s3.getObject({
            Bucket: this.config.bucket,
            Key: item.Key
        }).promise()
             .then(msg => {
                 return simpleParser(msg.Body);
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
            emails: []
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
        }
    },
}
</script>

<style lang="scss" scoped>
.table {
    tbody tr {
        cursor: pointer;
    }

    th:last-child {
        width: 70%;
    }
}
</style>
