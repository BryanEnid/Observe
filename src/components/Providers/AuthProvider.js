import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState();

  React.useEffect(() => {
    AsyncStorage.getItem("session-token").then(setToken);
  }, []);

  const signUp = () => {};

  const signIn = () => {};

  const signOut = () => {
    setToken(null);
    AsyncStorage.removeItem("session-token");
  };

  const anonymousSignIn = async () => {
    const token = `anonymous_${uuid.v4()}`;
    setToken(token);
    AsyncStorage.setItem("session-token", token);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        signUp,
        signIn,
        signOut,
        anonymousSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
