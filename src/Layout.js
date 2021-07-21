import React, { Fragment, useEffect, useState } from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Route, Switch, useHistory } from "react-router-dom";
import UserInfoPage from "./pages/userinfopage/UserInfoPage";
import { Auth } from "aws-amplify";
import { firestore } from "./services/firebase";
import { isUserExist } from "./services/users/users";
import ValidateUserwithQnA from "./pages/validateUserwithQnA/ValidateUserwithQnA";
import Customer from "./pages/customer/Customer";
import Manager from "./pages/manager/Manager";
import Main from "./pages/Main";

const Layout = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [user, setUser] = useState(null);
  const [userValidated, setUserValidated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    isUserExist();
    history.push("/security-check");
  }, []);

  const isUserExist = async () => {
    const userData = await Auth.currentUserPoolUser();
    setUser(userData);
    const ref = firestore.collection("user").doc(userData.userDataKey);
    console.log("document");
    ref
      .get()
      .then((doc) => {
        console.log(doc.data());
        if (doc.exists) {
          setUser(doc.data());
          setIsNewUser(false);
        } else {
          setIsNewUser(true);
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const isUserValid = (securityAnswer) => {
    if (securityAnswer.toLowerCase() === user.securityAnswer.toLowerCase()) {
      setUserValidated(true);
      history.push("/");
      return;
    }
    setUserValidated(false);
    alert("Invalid Answer, Please login again");
    Auth.signOut();
  };

  return (
    <div>
      <Switch>
        {isNewUser ? (
          <Route
            path="/security-check"
            render={() => (
              <UserInfoPage user={user} setUserValidated={setUserValidated} />
            )}
          />
        ) : (
          <Route
            path="/security-check"
            render={() => (
              <ValidateUserwithQnA user={user} isUserValid={isUserValid} />
            )}
          />
        )}
        {!isNewUser && userValidated ? <Main user={user} /> : null}
      </Switch>
      <AmplifySignOut />
    </div>
  );
};

export default Layout;
