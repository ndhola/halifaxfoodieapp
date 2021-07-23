import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router";
import Chats from "./customer/chats/Chats";
import ChatWindow from "./customer/chatwindow/ChatWindow";
import Customer from "./customer/Customer";
import Manager from "./manager/Manager";
import UserChats from "./manager/userchats/UserChats";
import UserChatWindow from "./manager/userchatwindow/UserChatWindow";

const Main = ({ user }) => {
  console.log("user", user);
  return (
    <div>
      {user.attributes["custom:role"] === "U" ? (
        <Switch>
          <Route
            exact
            path="/chats/:id"
            render={() => <ChatWindow user={user} />}
          />
          <Route path="/chats" render={() => <Chats user={user} />} />
          <Route path="/" render={() => <Customer user={user} />} />
        </Switch>
      ) : (
        <Switch>
          <Route
            exact
            path="/chats/:id"
            render={() => <UserChatWindow user={user} />}
          />
          <Route path="/chats" render={() => <UserChats user={user} />} />
          <Route path="/" render={() => <Manager user={user} />} />
        </Switch>
      )}
    </div>
  );
};

export default Main;
