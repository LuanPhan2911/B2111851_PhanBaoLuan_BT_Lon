import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isAuth: false,
      user: {
        _id: "_id",
        name: "",
        avatar: "",
        isAdmin: false,
      },
    };
  },
  mutations: {
    setUser(state, user) {
      state.user._id = user._id;
      state.user.name = user.name;
      state.user.avatar = user.avatar;
      state.user.isAdmin = user.isAdmin;
    },
    setUserNull(state) {
      state.user._id = "";
      state.user.name = "";
      state.user.avatar = "";
      state.user.isAdmin = false;
    },
    setAuth(state, auth) {
      state.isAuth = auth;
    },
  },
  actions: {
    login({ commit }, user) {
      commit("setAuth", true);
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("setAuth", false);
      commit("setUserNull");
      localStorage.removeItem("token");
    },
  },
});
export default store;
