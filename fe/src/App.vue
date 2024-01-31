<template>
  <div class="container">
    <app-bar />
    <router-view></router-view>
  </div>
</template>
<script>
import AppBar from "./components/layouts/AppBar.vue";
import AuthService from "@/services/AuthService";
export default {
  components: { AppBar },
  async created() {
    try {
      await AuthService.getUser();
    } catch (error) {}
  },
};
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>
