<script>
import { useAuth } from "../../../hooks/useAuth";
export default {
  setup() {
    const { logout } = useAuth();
    return { logout };
  },
};
</script>
<template>
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
    <div
      class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
    >
      <router-link
        :to="{ name: 'home' }"
        class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span class="fs-5 d-none d-sm-inline fw-bold">Book Library</span>
      </router-link>
      <ul
        class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
        id="menu"
      >
        <li class="nav-item">
          <router-link
            class="nav-link align-middle px-0"
            :to="{ name: 'adminDashboardView' }"
          >
            <i class="fs-4 bi-house"></i>
            <span class="ms-1 d-none d-sm-inline">Home</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link align-middle px-0"
            :to="{ name: 'adminUserView' }"
          >
            <i class="fs-4 bi-person-circle"></i>
            <span class="ms-1 d-none d-sm-inline">Users</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link align-middle px-0"
            :to="{ name: 'adminBookView' }"
          >
            <i class="fs-4 bi-book"></i>
            <span class="ms-1 d-none d-sm-inline">Books</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link align-middle px-0"
            :to="{ name: 'adminGenreView' }"
          >
            <i class="fs-4 bi-list-check"></i>
            <span class="ms-1 d-none d-sm-inline">Genres</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link align-middle px-0"
            :to="{ name: 'adminPublisherView' }"
          >
            <i class="fs-4 bi-projector"></i>
            <span class="ms-1 d-none d-sm-inline">Publishers</span>
          </router-link>
        </li>
        <li class="nav-item">
          <button class="nav-link align-middle px-0 pointer" @click="logout">
            <i class="fs-4 bi-box-arrow-left"></i>
            <span class="ms-1 d-none d-sm-inline">Sign out</span>
          </button>
        </li>
      </ul>
      <hr />
    </div>
  </div>
</template>
