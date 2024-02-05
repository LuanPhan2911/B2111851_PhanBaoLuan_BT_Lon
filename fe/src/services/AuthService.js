import store from "@/stores/store";
import createClient from "../axios";

class AuthService {
  constructor() {
    this.api = createClient("/api");
  }
  async login(data) {
    try {
      let res = await this.api.post("/login", data);
      if (res?.success) {
        let { token, user } = res.data;
        localStorage.setItem("token", `Bearer ${token}`);
        store.dispatch("login", user);
        return true;
      }
      return false;
    } catch (error) {}
  }
  async register(data) {
    try {
      let res = await this.api.post("/register", data);
      if (res?.success) {
        let { token, user } = res.data;
        localStorage.setItem("token", `Bearer ${token}`);
        store.dispatch("login", user);
        return true;
      }
      return false;
    } catch (error) {}
  }
  async getUser() {
    try {
      let res = await this.api.get("/user");
      if (res?.success) {
        let { user } = res.data;
        store.dispatch("login", user);
        return true;
      }
      return false;
    } catch (error) {
      store.dispatch("logout");
    }
  }
  async logout() {
    try {
      let res = await this.api.get("/logout");
      if (res?.success) {
        store.dispatch("logout");
        return true;
      }
      return false;
    } catch (error) {
      store.dispatch("logout");
    }
  }
}
export default new AuthService();
