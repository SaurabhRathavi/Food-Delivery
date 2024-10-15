export default {
  state() {
    return {
      user: null,
    };
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    removeUser(state) {
      state.user = null;
    },
  },
  actions: {
    login(context, user) {
      context.commit("setUser", user);
    },
    logout(context) {
      context.commit("removeUser");
      localStorage.clear();
    },
  },
};
