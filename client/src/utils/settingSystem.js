export const ACCESS_TOKEN_WEB_CAFE_SHOP = "ACCESS_TOKEN_WEB_CAFE_SHOP";
export const configHeader = () => {
  return {
    headers: {
      Authorization: localStorage.getItem(ACCESS_TOKEN_WEB_CAFE_SHOP)
        ? "Bearer " + localStorage.getItem(ACCESS_TOKEN_WEB_CAFE_SHOP)
        : null,
    },
  };
};
