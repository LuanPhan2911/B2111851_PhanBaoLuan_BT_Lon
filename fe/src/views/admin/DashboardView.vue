<script>
import { onMounted } from "vue";
export default {
  name: "adminDashboardView",
  setup() {
    onMounted(() => {
      document.title = "Admin - Dashboard";
    });
  },
};
</script>
<template>
  <div>Hello from admin</div>
</template>
