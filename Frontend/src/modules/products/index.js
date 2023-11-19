import { productsApi } from "@/api/productsApi";

// initial state
const state = () => ({
  products: [],
  searchProducts: [],
  pagination: null,
  paginationSearch: null,
  productDetail: null,
  error: "",
});

// getters
const getters = {};

// actions
const actions = {
  async getProducts({ commit }, { page, sort }) {
    try {
      const { data, pagination } = await productsApi.getProducts(page, sort);

      commit("setProducts", data);
      commit("setPagination", pagination);
    } catch (err) {
      console.log(err);
      commit("setError", err.message);
    }
  },
  async getProductDetail({ commit }, { id }) {
    try {
      const data = await productsApi.getDetailProduct(id);
      commit("setProductDetail", data);
    } catch (err) {
      console.log(err);
      commit("setError", err.message);
    }
  },
  async searchProduct({ commit }, { title, page }) {
    try {
      const { data, pagination } = await productsApi.searchProduct(title, page);
      commit("setSearchProducts", data);
      commit("setPaginationSearch", pagination);
    } catch (err) {
      console.log(err);
      commit("setError", err.message);
    }
  },
};

// mutations
const mutations = {
  setProducts(state, payload) {
    state.products = payload;
  },
  setSearchProducts(state, payload) {
    state.searchProducts = payload;
  },
  setPagination(state, payload) {
    state.pagination = payload;
  },
  setPaginationSearch(state, payload) {
    state.paginationSearch = payload;
  },
  setProductDetail(state, payload) {
    state.productDetail = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
