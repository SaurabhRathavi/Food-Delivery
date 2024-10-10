import {createStore} from "vuex";
import userModule from "./modules/user/index.js";

const store = createStore({
  modules: {
    user: userModule,
  },
  state() {
    return {};
  },
});

export default store