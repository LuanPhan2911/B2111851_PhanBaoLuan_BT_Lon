<script>
import { onMounted } from "vue";
export default {
  name: "adminBookView",
  setup() {
    onMounted(() => {
      document.title = "Admin - Manage Book";
    });
  },
};
</script>
<template>
  <div>Hello from admin book</div>
</template>
