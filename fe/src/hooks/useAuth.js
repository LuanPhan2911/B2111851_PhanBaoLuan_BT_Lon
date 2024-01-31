import AuthService from "@/services/AuthService";
import store from "@/stores/store";
import { computed } from "vue";

export function useAuth() {
  const isAuth = computed(() => store.state.isAuth);
  const user = computed(() => store.state.user);
  async function logout() {
    try {
      await AuthService.logout();
    } catch (error) {}
  }
  return { isAuth, user, logout };
}
