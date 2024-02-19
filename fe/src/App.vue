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
.line-break {
  white-space: pre-line;
}
.text-overflow-20-line {
  display: -webkit-box;
  -webkit-line-clamp: 20;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
