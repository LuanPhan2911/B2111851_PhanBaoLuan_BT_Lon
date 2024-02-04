<script>
import BreadCrumb from "./BreadCrumb.vue";

export default {
  components: { BreadCrumb },
  setup() {},
};
</script>
<template>
  <nav class="navbar">
    <div class="container-fluid">
      <div class="navbar-brand">
        <bread-crumb />
      </div>
    </div>
  </nav>
</template>
