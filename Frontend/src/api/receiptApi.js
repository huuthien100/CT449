import axiosClient from "../utils/axiosClient";
import { configHeader } from "@/utils/settingSystem";
export const receiptApi = {
  getReceipts: async () => {
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.get(`/receipt`, config);
    return results;
  },

  addReceipt: async (data) => {
    // data = { carts:[] };

    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.post(`/receipt`, data, config);
    return results;
  },

  confirmReceipt: async (idReceipt) => {
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.patch(
      `/receipt/${idReceipt}`,
      {},
      config
    );
    return results;
  },

  deleteReceipt: async (idReceipt) => {
    // Config header
    const config = configHeader();

    // Call api
    const { results } = await axiosClient.delete(
      `/receipt/${idReceipt}`,
      config
    );
    return results;
  },
};
