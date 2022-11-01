import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { auth } from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword as createUser } from "firebase/auth";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState("");
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    // AsyncStorage.removeItem("session-token");
    AsyncStorage.getItem("session-token").then((data) => {
      setToken(data);
      setInitialized(true);
    });
  }, []);

  React.useEffect(() => {
    console.log(auth);
  }, []);

  const signUp = async (email, password) => {
    const { user } = await createUser(auth, email, password);
  };

  const signIn = async () => {};

  const signOut = () => {
    setToken(null);
    AsyncStorage.removeItem("session-token");
  };

  const anonymousSignIn = async () => {
    const token = `anonymous_${uuid.v4()}`;
    setToken(token);
    AsyncStorage.setItem("session-token", token);
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
