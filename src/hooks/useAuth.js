import React from "react";
import { AuthContext } from "../components/Providers/AuthProvider";

export const useAuth = () => {
  const { token, signUp, signIn, signOut, anonymousSignIn, initialized } =
    React.useContext(AuthContext);

  return { token, signUp, signIn, signOut, anonymousSignIn, initialized };
};
