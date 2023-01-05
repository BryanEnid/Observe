import React from "react";
import { AuthContext } from "../components/Providers/AuthProvider";

export const useUser = () => {
  const { user, initialized } = React.useContext(AuthContext);
  return { user, initialized };
};
