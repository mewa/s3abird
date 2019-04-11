<template>
<div>
  <form @submit.prevent="updateLabels">
    <input class="form-control form-control-sm" type="text" placeholder="type filter expressions, e.g. 'to: hello@example.com', 'from: hi@example.com' or 'subject: Important'" v-model="label">
  </form>
  <div class="clearfix mt-1"></div>
  <span v-for="label in labels" class="badge badge-pill badge-primary"><strong>{{label.type}}</strong>: {{ label.value }} <i class="ex fas fa-times" @click="removeLabel(label)"></i/></span>
</div>
</template>

<script>
const AWS = require('aws-sdk');
const parser = require('./parser.js');
const Labels = require('./labels.js');

module.exports = {
    name: 'Filters',
    props: [],
    data: function () {
        return {
            label: ""
        }
    },
    computed: {
        labels: function () {
            return this.$store.state.labels;
        }
    },
    methods: {
        updateLabels() {
            let label = Labels.parse(this.label)

            if (label) {
                this.$store.commit('addLabel', label)
                this.label = "";
            }
        },
        removeLabel(label) {
            this.$store.commit('removeLabel', label)
        }
    }
}
</script>

<style scoped>
table.addr {
    font-size: 0.875rem;
    letter-spacing: .2px;
}
.ex.fas {
    cursor: pointer;
}
</style>
