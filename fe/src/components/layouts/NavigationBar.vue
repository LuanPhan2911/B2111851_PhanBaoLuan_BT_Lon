<script>
import { useAuth } from "../../hooks/useAuth";
export default {
  setup() {
    const { isAuth, user, logout } = useAuth();
    return { isAuth, user, logout };
  },
};
</script>
<template>
  <div class="offcanvas offcanvas-end" id="offcanvas">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-primary">Thư viện sách</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3" v-if="isAuth">
        <li class="nav-item my-2">
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5WqFhi05_OuYac8xRAUA0R2L1sAXsdR-6mg&usqp=CAU"
              alt=""
              width="70px"
              height="70px"
              class="rounded-circle"
            />
            <div class="text-center text-primary">{{ user.name }}</div>
          </div>
          <hr />
        </li>
        <li class="nav-item px-3">
          <router-link
            :to="{ name: 'updateUser' }"
            class="nav-link link-primary"
            >Hồ sơ</router-link
          >
        </li>
        <li class="nav-item px-3">
          <a class="nav-link link-danger pointer" @click="logout">Thoát</a>
        </li>
      </ul>
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3" v-else>
        <li class="nav-item">
          <router-link :to="{ name: 'login' }" class="nav-link px-2">
            Đăng nhập</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'register' }" class="nav-link px-2">
            Đăng ký</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
