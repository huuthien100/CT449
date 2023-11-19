import { productsApi } from "@/api/productsApi";

// initial state
const state = () => ({
  user: null,
});

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
