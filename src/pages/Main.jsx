import React, { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Customer from "./customer/Customer";
import Manager from "./manager/Manager";

const Main = ({ user }) => {
  console.log("user", user);
  return (
    <div>
      {user.attributes["custom:role"] === "U" ? (
        <Fragment>
          <Route path="/" render={() => <Customer user={user} />} />
        </Fragment>
      ) : (
        <Fragment>
          <Route path="/" render={() => <Manager user={user} />} />
        </Fragment>
      )}
    </div>
  );
};

export default Main;
