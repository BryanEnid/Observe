import React from "react";
import {
  createUserWithEmailAndPassword as createUser,
  signOut as fbSignOut,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState("");
  const [initialized, setInitialized] = React.useState(false);

  const signUp = async (email, password) => {
    const { user } = await createUser(auth, email, password);
  };

  const signIn = async (email, password) => {
    let error = false;
    let user = false;

    // ! NOTE: try and catch doesn't work since Firebase SDK has its own built-in promise events
    await signInWithEmailAndPassword(auth, email, password)
      .then((v) => (user = v))
      .catch((e) => (error = e));

    if (error) throw error;
    return user;
  };

  const signOut = () => {
    fbSignOut(auth);
    setToken(null);
  };

  const anonymousSignIn = async () => {
    return signInAnonymously(auth);
    // const token = `anonymous_${uuid.v4()}`;
    // setToken(token);
    // AsyncStorage.setItem("session-token", token);
  };

  const triggerFederatedLogin = async (type) => {};

  return (
    <AuthContext.Provider
      value={{
        token,
        signUp,
        signIn,
        signOut,
        anonymousSignIn,
        initialized,
        triggerFederatedLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
