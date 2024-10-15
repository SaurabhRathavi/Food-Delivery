import { createStore } from "vuex";
import userModule from "./modules/user/index.js";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    user: userModule,
  },
  state() {
    return {};
  },
  plugins: [
    createPersistedState({
      // You can choose localStorage (default) or sessionStorage
      storage: window.localStorage, // or use window.sessionStorage
    }),
  ],
});

export default store;
