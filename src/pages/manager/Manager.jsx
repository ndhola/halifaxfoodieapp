import React from "react";
import FoodItems from "./foodItems/FoodItems";

const Manager = ({ user }) => {
  return (
    <div>
      <FoodItems user={user} />
    </div>
  );
};

export default Manager;
