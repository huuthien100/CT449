import axiosClient from "../utils/axiosClient";
import queryString from "query-string";
import { configHeader } from "@/utils/settingSystem";
export const productsApi = {
  getProducts: async (page, sort) => {
    let querySort = `page=${page || 1}`;

    // Check sort
    if (sort?.createdAt || sort?.price) {
      // Delete key had null
      Object.keys(sort).forEach((key) =>
        sort[key] === null ? delete sort[key] : {}
      );

      // Convert to url
      const filter = queryString.stringify(sort);

      // Full url sort
      querySort += `&${filter}`;
    }

    // Call api
    const { results } = await axiosClient.get(`/product?${querySort}`);
    return results;
  },

  addProduct: async (data) => {
    // data = {title: "",description: "",image: "",price: {S: 0,M: 0,L: 0,}};

    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.post(`/product`, data, config);
    return results;
  },

  editProduct: async (data) => {
    // data = {title: "",description: "",image: "",price: {S: 0,M: 0,L: 0,}};

    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.patch(
      `/product/${data.idProduct}`,
      data,
      config
    );
    return results;
  },

  deleteProduct: async (idProduct) => {
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.delete(
      `/product/${idProduct}`,
      config
    );
    return results;
  },

  getDetailProduct: async (id) => {
    // Call api
    const { results } = await axiosClient.get(`/product/${id}`);
    return results;
  },

  searchProduct: async (title, page) => {
    // Call api
    const { results } = await axiosClient.get(
      `/product/search?title=${title}&page=${page || 1}`
    );
    return results;
  },
};
