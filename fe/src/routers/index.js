import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import UpdateProfileView from "@/views/UpdateProfileView.vue";
import UserLayout from "@/components/layouts/UserLayout.vue";
import store from "@/stores/store";
import admin from "./admin";
const routes = [
  {
    path: "/",
    component: UserLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "login",
        name: "login",
        component: LoginView,
      },
      {
        path: "register",
        name: "register",
        component: RegisterView,
      },
      {
        path: "profile",
        name: "updateUser",
        component: UpdateProfileView,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  ...admin,
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!localStorage.getItem("token")) {
//       next({
//         path: "/login",
//         params: { nextUrl: to.fullPath },
//       });
//     } else {
//       if (!store.state.isAuth) {
//         next({
//           path: "/login",
//           params: { nextUrl: to.fullPath },
//         });
//       } else {
//         next();
//       }
//     }
//   } else {
//     next();
//   }
// });

export default router;
