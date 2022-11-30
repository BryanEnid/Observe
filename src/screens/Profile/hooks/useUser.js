import React, { useState } from "react";
import { auth } from "../config/FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export const useUser = () => {
  const [user, setUser] = React.useState(null);
  const [initialized, setInitialized] = React.useState(false);
  const [pictureUrl, setPictureUrl] = useState(
    "https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg"
  );

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      let updatedUser = user;
      if (user?.uid) {
        const userInfo = await getDoc(doc(db, "users", user.uid));

        if (userInfo.exists()) {
          updatedUser = { ...updatedUser, ...userInfo.data() };

          setPictureUrl(userInfo.data().picture);
        }
      }

      setUser(updatedUser);
    });
    setInitialized(true);
    return unsubscribe;
  }, []);

  return { user, initialized, pictureUrl, setPictureUrl };
};
