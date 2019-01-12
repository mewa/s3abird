<template>
<div v-if="email">
  <h4>{{ email.subject }}</h4>
  <table class="addr">
    <tbody>
      <tr>
        <th scope="row">{{ email.from.text }}</th>
      </tr>
      <tr>
        <td scope="row"><span class="text-secondary">to</span> {{ email.to.text }}</td>
      </tr>
      <tr>
        <td scope="row">
          <div class="my-2" v-html="email.html || email.textAsHtml"></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
const AWS = require('aws-sdk');
const parser = require('./parser.js');

module.exports = {
    name: 'Email',
    props: ['messageId'],
    data: function () {
        return {
            email: this.$store.state.emails.get(this.messageId)
        };
    },
    computed: {
        key: function () {
            return Buffer.from(this.messageId, 'base64').toString()
        },
        config: function () {
            return this.$store.state.config
        }
    },
    created: function () {
        if (this.email) {
            // email already loaded
            return;
        }

        AWS.config.accessKeyId = this.config.aws_access_key_id;
        AWS.config.secretAccessKey = this.config.aws_secret_access_key;

        const s3 = new AWS.S3({ region: this.config.aws_region });

        s3.getObject({
            Bucket: this.config.bucket,
            Key: this.key
        }).promise()
            .then(msg => {
                return parser(msg.Body);
            })
            .then(parsed => {
                this.email = parsed;
            });
    }
}
</script>

<style scoped>
table.addr {
    font-size: 0.875rem;
    letter-spacing: .2px;
}
</style>
