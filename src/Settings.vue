<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" to="/">s3abird</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSettings" aria-controls="navbarSettings" aria-expanded="false" aria-label="Toggle settings">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSettings">
    <form class="form-inline ml-auto my-2 my-lg-0" @submit.prevent="updateConfig">
      <input class="form-control my-1 my-lg-0 mr-sm-2" placeholder="AWS Region" aria-label="AWS Region" v-model="config.aws_region">
      <input class="form-control my-1 my-lg-0 mr-sm-2" placeholder="S3 Bucket" aria-label="S3 Bucket" v-model="config.bucket">
      <input class="form-control my-1 my-lg-0 mr-sm-2" type="password" placeholder="AWS Access Key Id" aria-label="AWS Access Key Id" v-model="config.aws_access_key_id">
      <input class="form-control my-1 my-lg-0 mr-sm-2" type="password" placeholder="AWS Access Key Id" aria-label="AWS Secret Access Key" v-model="config.aws_secret_access_key">
      <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Save config</button>
    </form>
  </div>
</nav>
</template>

<script>
module.exports = {
    name: 'Settings',
    data: function () {
        return {
            config: this.$store.state.config
        };
    },
    methods: {
        updateConfig: function () {
            this.$store.commit('updateConfig', { ...this.config });
        }
    },
};
</script>
