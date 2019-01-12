<template>
<div>
  <Settings></Settings>
  <div class="container bg-light my-2 my-md-5 py-4 rounded">
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
