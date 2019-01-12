<template>
<div>
  <Settings></Settings>
  <keep-alive include="EmailList">
    <router-view></router-view>
  </keep-alive>
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
