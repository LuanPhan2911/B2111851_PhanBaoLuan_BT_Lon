<script>
import { onMounted } from "vue";
export default {
  name: "adminPublisherView",
  setup() {
    onMounted(() => {
      document.title = "Admin - Manage Publisher";
    });
  },
};
</script>
<template>
  <div>Hello from publisher</div>
</template>
