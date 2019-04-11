<template>
<div>
  <Settings></Settings>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="mt-2 col col-sm-9 col-md-10">
        <div class="bg-light rounded px-3 py-2">
          <keep-alive include="EmailList">
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
    <div class="row">
      <footer class="container d-flex justify-content-between my-2">
        <span>Made with <i class="fas fa-heart"></i> by <a href="https://marcinchmiel.com">Marcin Chmiel</a></span>
        <a href="https://github.com/mewa/s3abird"><i class="fab fa-github"></i> Contribute</a>
      </footer>
    </div>
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

<style lang="scss" scoped>
footer {
    font-size: 0.875rem;

    color: rgba(#fff, .4);

    a {
        &:hover {
            color: rgba(#fff, 7);
        }

        color: inherit;
        text-decoration: none;
    }
}
</style>
