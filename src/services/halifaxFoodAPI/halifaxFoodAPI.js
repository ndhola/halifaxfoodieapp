const HALIFAXFOODIE_API_URL = "http://192.168.0.21:8080";
export default {
  createOrder: () => {
    return {
      url: `${HALIFAXFOODIE_API_URL}/createOrder`,
      method: "post",
    };
  },
  getOrders: () => {
    return {
      url: `${HALIFAXFOODIE_API_URL}/getOrders`,
      method: "get",
    };
  },
  getAllFoodItems: () => {
    return {
      url: `${HALIFAXFOODIE_API_URL}/getAllFoodItems`,
      method: "get",
    };
  },
  createFoodItem: () => {
    return {
      url: `${HALIFAXFOODIE_API_URL}/createFoodItem`,
      method: "post",
    };
  },
  getFoodItemsByRestaurant: () => {
    return {
      url: `${HALIFAXFOODIE_API_URL}/getFoodItemsByRestaurant`,
      method: "post",
    };
  },
};
