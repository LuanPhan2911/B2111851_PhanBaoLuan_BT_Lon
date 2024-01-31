<script>
import icon from "@/assets/icons/android-chrome-192x192.png";
import NavigationBar from "./NavigationBar.vue";

export default {
  components: { NavigationBar },
  name: "AppBar",
  setup() {
    return { icon };
  },
};
</script>
<template>
  <div class="container">
    <nav class="navbar">
      <div class="container-fluid">
        <router-link class="navbar-brand text-primary" to="/">
          <img :src="icon" alt="" class="branch-icon-size" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>

    <teleport to="body"> <navigation-bar /> </teleport>
  </div>
</template>
<style scoped>
.branch-icon-size {
  width: 3em;
  height: 3em;
}
</style>
