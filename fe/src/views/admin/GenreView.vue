<script>
import { onMounted } from "vue";
export default {
  name: "adminGenreView",
  setup() {
    onMounted(() => {
      document.title = "Admin - Manage Genre";
    });
  },
};
</script>
<template>
  <div>Hello from Genre</div>
</template>
