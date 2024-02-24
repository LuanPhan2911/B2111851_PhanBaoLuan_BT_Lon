<script>
import { useAuth } from "../../../hooks/useAuth";
import BreadCrumb from "./BreadCrumb.vue";

export default {
  components: { BreadCrumb },
  setup() {
    const { user } = useAuth();
    return { user };
  },
};
</script>
<template>
  <nav class="navbar">
    <div class="container-fluid">
      <div class="navbar-brand">
        <bread-crumb />
      </div>
      <div class="fw-bold text-capitalize text-primary">
        Hello, {{ user?.name }}
      </div>
    </div>
  </nav>
</template>
