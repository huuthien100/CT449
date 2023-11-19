import { cartApi } from "@/api/cartApi";

// initial state
const state = () => ({
  carts: [],
});

// getters
const getters = {
  cartOrdering(state) {
    return state.carts.filter((s) => !s.ordered);
  },
  cartOrdered(state) {
    return state.carts.filter((s) => s.ordered);
  },
};

// actions
const actions = {
  async getCarts({ commit }) {
    try {
      const data = await cartApi.getCart();
      commit("setCarts", data);
    } catch (err) {
      console.log(err);
    }
  },
};

// mutations
const mutations = {
  setCarts(state, payload) {
    state.carts = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
