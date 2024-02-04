<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
export default {
  components: { Sidebar, Navbar },
};
</script>
<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <sidebar />
      <div class="col">
        <header>
          <navbar />
        </header>
        <main>
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
