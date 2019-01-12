<template>
<div>
  <Settings></Settings>
  <div class="container bg-light my-5 rounded py-4">
    <keep-alive include="EmailList">
      <router-view></router-view>
    </keep-alive>
  </div>
</div>
</template>

<script>
const Settings = require('./Settings.vue');

module.exports = {
    name: 'App',
    components: {
        Settings
    }
};
</script>
