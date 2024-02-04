<script>
import AppBar from "./AppBar.vue";
export default {
  name: "UserLayout",
  components: { AppBar },
  setup() {},
};
</script>
<template>
  <div class="container">
    <app-bar></app-bar>
    <router-view />
  </div>
</template>
