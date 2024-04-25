import AuthService from "@/services/AuthService";
import store from "@/stores/store";
import { computed } from "vue";

export function useAuth() {
  const isAuth = computed(() => store.state.isAuth);
  const user = computed(() => store.state.user);
  const isAdmin = computed(() => user.value?.isAdmin);
  async function logout() {
    try {
      await AuthService.logout();
    } catch (error) {}
  }
  return { isAuth, isAdmin, user, logout };
}
