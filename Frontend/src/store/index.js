import { createStore } from "vuex";
import products from "../modules/products";
import user from "../modules/user";
import carts from "../modules/cart";
import receipts from "../modules/receipt";

const store = createStore({
  modules: {
    products,
    user,
    carts,
    receipts,
  },
});

export default store;
