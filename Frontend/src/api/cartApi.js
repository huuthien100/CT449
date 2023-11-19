import { configHeader } from "@/utils/settingSystem";
import axiosClient from "../utils/axiosClient";

export const cartApi = {
  addToCart: async (data) => {
    console.log(data);
    // Config header
    const config = configHeader();
    
    const { results } = await axiosClient.post("/cart", data, config);
    return results;
  },

  getCart: async () => {
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.get("/cart", config);

    return results;
  },

  editCart: async (data) => {
    // data = {idCart:"",quantity:""}
    const { idCart, quantity } = data;
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.patch(
      `/cart/${idCart}`,
      { quantity },
      config
    );

    return results;
  },

  deleteCart: async (idCart) => {
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.delete(`/cart/${idCart}`, config);

    return results;
  },

  order: async () => {
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.get("/cart/order", config);

    return results;
  },
};
