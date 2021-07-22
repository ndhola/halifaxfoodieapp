import React from "react";
import { AmplifyChatbot } from "@aws-amplify/ui-react";

const Customer = () => {
  return (
    <div>
      <div>Customer Page</div>
      <AmplifyChatbot
        botName="HalifaxFoodie_dev"
        botTitle="My ChatBot"
        welcomeMessage="Hello, how can I help you?"
      />
    </div>
  );
};

export default Customer;
