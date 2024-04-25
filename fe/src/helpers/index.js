import AuthService from "@/services/AuthService";
import store from "@/stores/store";

export function filterObjectByKeys(obj, keys) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  );
}
export function asset(url) {
  return `${import.meta.env.VITE_APP_BACKEND_URL}${url}`;
}
export async function guard(to, from, next) {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next({
        name: "login",
      });
      return;
    }
    let isAuth = await AuthService.getUser();
    if (!isAuth) {
      next({
        name: "login",
      });
      return;
    }

    if (
      to.matched.some((record) => record.meta.requiresAdmin) &&
      !store.state.user.isAdmin
    ) {
      next({
        name: "home",
      });
      return;
    }
  }

  next();
}
