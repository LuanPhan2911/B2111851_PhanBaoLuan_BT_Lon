<script>
import AppBar from "./AppBar.vue";
import Footer from "./Footer.vue";
export default {
  name: "UserLayout",
  components: { AppBar, Footer },
  setup() {},
};
</script>
<template>
  <div class="main">
    <div class="container">
      <app-bar></app-bar>
      <hr />
      <div class="my-3">
        <router-view />
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
<style scoped>
.main {
  min-height: 100vh;
  position: relative;
  background: url("../../assets//images/background.jpg");
}
</style>
