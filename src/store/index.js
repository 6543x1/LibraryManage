import { createStore } from "vuex";

export default createStore({
  state: {
    token:
      "eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjYsInN1YiI6InN0dWRlbnQzIiwiZXhwIjoxNjM3NzMxNTYxLCJpYXQiOjE2Mzc0NzIzNjF9.VzULzhrumF6GuScPzt_KRBH4oVNBC4t6nAEEze7P_MmPrcI-RGF24W1Y7awpTcBiGmMyum0jkbdP8aLPXBE6Bg",
  },
  mutations: {
    setToken(state, step) {
      state.token = step;
    },
  },
  actions: {},
  modules: {},
});
