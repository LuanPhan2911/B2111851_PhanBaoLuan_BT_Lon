<template>
  <div class="container">
    <app-bar />
    <router-view></router-view>
  </div>
</template>
<script>
import AppBar from "./components/layouts/AppBar.vue";
export default {
  components: { AppBar },
};
</script>
