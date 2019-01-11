<template>
<div>
  <table class="table table-dark table-hover table-striped">
    <thead>
      <tr>
        <th>Date</th>
        <th>From</th>
        <th>Subject</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="email in emails" @click="openEmail(email)">
        <td>{{ new Date(email.date).toUTCString() }}</td>
        <td class="ellipsized">{{ email.from.text }}</td>
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

module.exports = {
    name: 'EmailList',
    data: function () {
        return {
            emails: []
        }
    },
    methods: {
        openEmail: function (e) {
            this.$router.push({ path: `/inbox/${e.key}` });
        }
    },
    created: function () {
        AWS.config.accessKeyId = this.$root.aws_access_key_id;
        AWS.config.secretAccessKey = this.$root.aws_secret_access_key;

        const s3 = new AWS.S3({ region: this.$root.aws_region });

        s3.listObjectsV2({
            Bucket: this.$root.bucket
        }).promise()
            .then(r => {
                this.emails = [];
                return r.Contents;
            })
            .then(r => r.sort((a, b) => b.LastModified - a.LastModified))
            .map(item => s3.getObject({
                Bucket: this.$root.bucket,
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
                });
    }
}
</script>

<style>
.ellipsized {
    /* max-width: 200px; */
    /* white-space: nowrap; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
}
</style>
