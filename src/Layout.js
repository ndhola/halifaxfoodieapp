import React, { useEffect, useState } from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { firestore } from "./services/firebase";
import Main from "./pages/Main";
import SecurityCheck from "./pages/security-check/SecurityCheck";

const Layout = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userValidated, setUserValidated] = useState(false);

  useEffect(() => {
    isUserExist();
  }, [user]);

  const isUserExist = () => {
    if (user && user.attributes) {
      const ref = firestore.collection("user").doc(user.attributes.sub);
      ref
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserInfo(doc.data());
          } else {
            setUserInfo(null);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  };

  const isUserValid = (securityAnswer) => {
    if (
      userInfo &&
      securityAnswer.toLowerCase() === userInfo.securityAnswer.toLowerCase()
    ) {
      setUserValidated(true);
      return;
    }
    setUserValidated(false);
    alert("Invalid Answer, Please login again");
    Auth.signOut();
  };

  return (
    <div>
      {userValidated ? (
        <Main user={user} />
      ) : (
        <SecurityCheck
          userInfo={userInfo}
          user={user}
          isUserValid={isUserValid}
          setUserValidated={setUserValidated}
        />
      )}
      <AmplifySignOut
        handleAuthStateChange={(state) => {
          if (state === "signedout") {
            setUserValidated(false);
            Auth.signOut();
          }
        }}
      />
    </div>
  );
};

export default Layout;
