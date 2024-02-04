<template>
  <router-view></router-view>
</template>
<script>
import AuthService from "@/services/AuthService";
export default {
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
