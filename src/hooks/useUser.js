import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useAuth } from "./useAuth";
import { AuthContext } from "../components/GlobalProvider";

export const useUser = () => {
  const [user, setUser] = React.useState();
  const { token } = useAuth();

  React.useEffect(() => {
    if (token) {
      setUser({ token, anonymous: token.includes("anonymous") });
    } else {
      setUser(null);
    }
  }, [token]);

  return { user: true };
};
