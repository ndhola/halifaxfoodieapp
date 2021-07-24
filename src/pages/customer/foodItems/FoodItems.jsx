import React, { useState, useEffect } from "react";
import axios, { Routes } from "../../../services/axios";
import FoodItemList from "./foodItemList/FoodItemList";

const FoodItems = () => {
  const [foodItemList, setFoodItemList] = useState(null);

  useEffect(() => {
    loadAllFoodItems();
  }, []);

  const loadAllFoodItems = async () => {
    try {
      const { url, method } = Routes.halifaxfoodieAPI.getAllFoodItems();
      const { data } = await axios[method](url);
      console.log(data);
      if (data.foodItems) {
        setFoodItemList(data.foodItems);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <FoodItemList itemList={foodItemList} />
    </div>
  );
};

export default FoodItems;
