import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

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
        initialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
