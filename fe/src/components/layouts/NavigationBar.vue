<script>
import { useRouter } from "vue-router";
import { useAuth } from "../../hooks/useAuth";
import Offcanvas from "./Offcanvas.vue";
export default {
  components: { Offcanvas },
  setup() {
    const { isAuth, isAdmin, user, logout } = useAuth();
    const router = useRouter();
    const onLogout = async () => {
      if (confirm("Bạn muốn đăng xuất tài khoản?")) {
        await logout();
        router.push({
          name: "login",
        });
      }
    };

    return { isAuth, isAdmin, user, onLogout };
  },
};
</script>
<template>
  <offcanvas>
    <template #title>Thư viện sách </template>
    <template #body>
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3" v-if="isAuth">
        <li class="nav-item my-2">
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <img
              :src="user?.avatar"
              alt=""
              style="width: 70px; height: 70px"
              class="rounded-circle"
            />
            <div class="text-center text-primary">{{ user.name }}</div>
          </div>
          <hr />
        </li>
        <li class="nav-item px-3" data-bs-dismiss="offcanvas" v-if="isAdmin">
          <router-link
            :to="{ name: 'adminDashboardView' }"
            class="nav-link link-primary"
            >Quản lý thư viện</router-link
          >
        </li>
        <li class="nav-item px-3" data-bs-dismiss="offcanvas">
          <router-link
            :to="{ name: 'updateUser' }"
            class="nav-link link-primary"
            >Thông tin tài khoản</router-link
          >
        </li>
        <li class="nav-item px-3" data-bs-dismiss="offcanvas">
          <router-link :to="{ name: 'bookShelf' }" class="nav-link link-primary"
            >Tủ sách</router-link
          >
        </li>

        <li class="nav-item px-3" data-bs-dismiss="offcanvas">
          <button class="nav-link link-danger pointer" @click="onLogout">
            Thoát
          </button>
        </li>
      </ul>
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3" v-else>
        <li class="nav-item" data-bs-dismiss="offcanvas">
          <router-link :to="{ name: 'login' }" class="nav-link px-2">
            Đăng nhập</router-link
          >
        </li>
        <li class="nav-item" data-bs-dismiss="offcanvas">
          <router-link :to="{ name: 'register' }" class="nav-link px-2">
            Đăng ký</router-link
          >
        </li>
      </ul>
    </template>
  </offcanvas>
</template>
