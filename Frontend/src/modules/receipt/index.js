import { receiptApi } from "@/api/receiptApi";

// initial state
const state = () => ({
  receipts: [],
});

// getters
const getters = {};

// actions
const actions = {
  async getReceipts({ commit }) {
    try {
      const data = await receiptApi.getReceipts();

      commit("setReceipts", data);
    } catch (err) {
      console.log(err);
    }
  },
};

// mutations
const mutations = {
  setReceipts(state, payload) {
    state.receipts = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
