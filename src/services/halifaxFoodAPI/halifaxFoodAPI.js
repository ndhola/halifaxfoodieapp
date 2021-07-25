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
      method: "post",
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
  getRestaurantOrders: () => {
    return {
      url: `${HALIFAXFOODIE_API_URL}/getRestaurantOrders`,
      method: "post",
    };
  },
  changeOrderStatus: () => {
    return {
      url: `${HALIFAXFOODIE_API_URL}/changeOrderStatus`,
      method: "put",
    };
  },
};
