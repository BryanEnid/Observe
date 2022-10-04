import React from "react";
import { AuthContext } from "../components/Providers/AuthProvider";

export const useAuth = () => {
  return React.useContext(AuthContext);
};
