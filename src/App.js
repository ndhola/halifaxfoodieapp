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

  console.log(userRole);

  return (
    <div className="App">
      <AmplifyAuthenticator handleAuthStateChange={onAuthChange}>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: "username" },
            { type: "password" },
            { type: "email", required: true },
            {
              type: "custom:role",
              required: true,
              label:
                "User Role (Enter 'U' for user and 'H' for restaurant employee)",
              value: userRole,
              handleInputChange: (e) =>
                e.target.value.toLowerCase() !== "a"
                  ? setUserRole("U")
                  : setUserRole("H"),
              inputProps: {
                value: userRole,
              },
            },
          ]}
        />
      </AmplifyAuthenticator>
      {isUserLoggedIn && (
        <Fragment>
          <div>Welcome to Halifax Foodie</div>
          <AmplifySignOut />
        </Fragment>
      )}
    </div>
  );
}

export default App;
