import React, { useContext, useState } from "react";
import {
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  // change this for all info ( currentUserInfo ), current uid only
  const [currentUser, setCurrentUser] = useState();
  const [currentUserInfo, setCurrentUserInfo] = useState();

  const auth = getAuth();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("created ", email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }

  //send email verification
  function sendemailver() {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        sendEmailVerification(user);
      } else {
      }
    });
  }

  async function login(email, password) {
    let respond = "";
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          if (userCredential.user.emailVerified) {
            // change to boolean prop isVerified
            respond = "verified";
          } else {
            respond = "not verified";
          }
        }
      );
    } catch (e) {
      respond = e.code;
    }
    return respond;
  }

  function logout() {
    signOut(auth)
      .then(() => {
        console.log("logout");

        setCurrentUser(null);
      })
      .catch((error) => {
        // An error happened.
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (currentUser !== user.uid) {
        // change user
        setCurrentUserInfo(user);
        setCurrentUser(user.uid);
        console.log(user.uid);
      }

      // ...
    } else {
      // User is signed out
      // ...
    }

    setLoading(false);
  });

  const value = {
    currentUser,
    currentUserInfo,
    login,
    signUp,
    logout,
    sendemailver,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
