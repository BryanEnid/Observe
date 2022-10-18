import React from "react";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const [user, setUser] = React.useState();

  const { token, initialized } = useAuth();

  React.useEffect(() => {
    if (!!token?.length) {
      setUser({ token, anonymous: token.includes("anonymous") });
    } else {
      setUser(null);
    }
  }, [token]);

  return { user, initialized };
};
