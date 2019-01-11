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
    props: ['access_key_id', 'secret_access_key', 'bucket'],
    data: function () {
        return {
            emails: []
        }
    },
    methods: {
        openEmail: function (e) {
            console.log(e);
        }
    },
    created: function () {
        AWS.config.accessKeyId = this.access_key_id;
        AWS.config.secretAccessKey = this.secret_access_key;

        const s3 = new AWS.S3({ region: 'eu-west-1' });

        s3.listObjectsV2({
            Bucket: this.bucket
        }).promise()
            .then(r => r.Contents)
            .then(r => r.sort((a, b) => b.LastModified - a.LastModified))
            .map(item => {
                s3.getObject({
                    Bucket: this.bucket,
                    Key: item.Key
                }).promise()
                    .then(msg => simpleParser(msg.Body))
                    .then(parsed => {
                        console.log(parsed);
                        this.emails.push(parsed);
                })
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
