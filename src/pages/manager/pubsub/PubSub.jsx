import React from "react";
import { useEffect } from "react";

const PubSub = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This will run every second!");
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div></div>;
};

export default PubSub;
