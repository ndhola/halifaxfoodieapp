import React from "react";
import FoodItems from "./foodItems/FoodItems";
import Sentiment from "./sentiment/Sentiment";

const Manager = ({ user }) => {
  return (
    <div>
      <FoodItems user={user} />
      <Sentiment />
    </div>
  );
};

export default Manager;
