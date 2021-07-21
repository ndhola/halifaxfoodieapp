import logo from "./logo.svg";
import "./App.css";
import {
  withAuthenticator,
  AmplifySignOut,
  AmplifyAuthenticator,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { Fragment, useEffect, useState } from "react";
import Layout from "./Layout";

function App() {
  const [userRole, setUserRole] = useState("U");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    // fetchUser();
  });

  const onAuthChange = async (state) => {
    if (state === "signedin") {
      setIsUserLoggedIn(true);
      const user = await Auth.currentUserPoolUser();
      console.log(user);
    }
  };

  const handleSignUp = (data) => {
    if (data.attributes["custom:role"] === "H") {
      data.attributes["custom:role"] = "H";
    } else {
      data.attributes["custom:role"] = "U";
    }
    Auth.signUp(data);
    Auth.signOut();
  };

  console.log("role", userRole);

  return (
    <div className="App">
      <AmplifyAuthenticator handleAuthStateChange={onAuthChange}>
        <AmplifySignUp
          slot="sign-up"
          handleSignUp={handleSignUp}
          formFields={[
            { type: "username" },
            { type: "password" },
            { type: "email", required: true },
            {
              type: "custom:role",
              required: true,
              label:
                "User Role (Enter 'U' for user and 'H' for restaurant employee)",
            },
          ]}
        />
      </AmplifyAuthenticator>
      {isUserLoggedIn && (
        <Fragment>
          <Layout />
        </Fragment>
      )}
    </div>
  );
}

export default App;
