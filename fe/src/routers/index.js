import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BookDetailView from "@/views/BookDetailView.vue";
import UpdateProfileView from "@/views/UpdateProfileView.vue";
import BookShelfView from "@/views/BookShelfView.vue";
import BookFilterView from "@/views/BookFilterView.vue";
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
        path: "books/:slug",
        name: "bookDetail",
        component: BookDetailView,
      },
      {
        path: "books",
        name: "bookFilter",
        component: BookFilterView,
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
      {
        path: "users/books",
        name: "bookShelf",
        component: BookShelfView,
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
