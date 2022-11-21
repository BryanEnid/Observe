import React from "react";
import { auth } from "../config/FirebaseConfig";

export const useUser = () => {
  const [user, setUser] = React.useState(null);
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    setInitialized(true);
    return unsubscribe;
  }, []);

  return { user, initialized };
};
