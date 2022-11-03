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
    reactotron.log(user);
  };

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
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
