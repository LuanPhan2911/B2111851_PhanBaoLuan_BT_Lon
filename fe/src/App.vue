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
.text-overflow-10-line {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-overflow-3-line {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
