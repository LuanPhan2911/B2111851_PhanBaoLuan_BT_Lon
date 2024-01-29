<script setup>
import { ref } from "vue";
import icon from "@/assets/icons/apple-touch-icon.png";

const isLogin = ref(false);
</script>
<template>
  <div class="container">
    <nav class="navbar">
      <div class="container-fluid">
        <router-link class="navbar-brand text-primary" to="/">
          <img :src="icon" alt="" width="70" height="70" />
          viện sách
        </router-link>
        <div class="d-flex">
          <form
            class="d-flex mb-3 position-relative"
            method="get"
            action="/search"
          >
            <input
              class="form-control mx-2"
              type="search"
              placeholder="Tìm kiếm"
              name="q"
              value=""
            />
            <button
              class="btn position-absolute end-0 top-0 me-5"
              type="submit"
            >
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
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
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <div v-if="isLogin">
                <li class="nav-item shadow my-2">
                  <div
                    class="d-flex flex-column justify-content-center align-items-center"
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5WqFhi05_OuYac8xRAUA0R2L1sAXsdR-6mg&usqp=CAU"
                      alt=""
                      width="70px"
                      height="70px"
                      class="img-thumbnail"
                    />
                    <div class="text-center text-primary"></div>
                  </div>
                </li>
                <li class="nav-item px-3">
                  <a href="" class="nav-link link-primary">Hồ sơ</a>
                </li>
                <li class="nav-item px-3">
                  <a href="/logout" class="nav-link link-danger">Thoát</a>
                </li>
              </div>
              <div v-else>
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
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
