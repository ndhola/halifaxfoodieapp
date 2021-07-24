import React from "react";
import { AmplifyChatbot } from "@aws-amplify/ui-react";
import FoodItems from "./foodItems/FoodItems";

const Customer = () => {
  const handleComplete = (data) => {
    console.log(data);
    return data;
  };

  return (
    <div>
      <div>Customer Page</div>
      <FoodItems />
      <div>
        <AmplifyChatbot
          onChatCompleted={handleComplete}
          botName="HalifaxFoodie_dev"
          botTitle="My ChatBot"
          welcomeMessage="Hello, how can I help you?"
        />
      </div>
    </div>
  );
};

export default Customer;
