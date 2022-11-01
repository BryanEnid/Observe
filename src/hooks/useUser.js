import React from "react";
import { auth } from "../config/FirebaseConfig";

export const useUser = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return { user };
};
