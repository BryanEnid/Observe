import React from "react";
import { setDoc, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { useUser } from "./useUser";

const userStructure = {
  firstName: null,
  lastName: null,
  email: null,
  skills: [],
  experience: [],
  certifications: [],
  files: [],
  recommends: [],
  buckets: [],
  following: null,
  followers: null,

  // TODO: marketing data
};

// TODO: Add React Query
export const useProfile = () => {
  const { user, initialized } = useUser();
  const [profile, setProfile] = React.useState();

  React.useEffect(() => {
    if (user && !profile) {
      console.log("initialized", !!initialized);
      console.log("user", !!user);
      console.log("profile", !!profile);
      getProfile();
    }
  }, [initialized]);

  React.useEffect(() => {
    console.log(">>> profile", !!profile);
  }, [profile]);

  const createProfile = ({ uid, ...body }) => {
    const collectionRef = doc(db, "users", uid);
    return setDoc(collectionRef, {
      ...userStructure, // Structure
      ...body, // Updates
      // uid: user.uid,
      created: Timestamp.now(),
    });
  };

  const getProfile = () => {
    const docRef = doc(db, "users", user.uid);
    getDoc(docRef)
      .then((doc) => {
        const data = doc.data();
        setProfile(data);
        console.log("done");
        console.log("======");
      })
      .catch(console.error);
  };

  const defaultOptions = { isRef: false, arrayUnion: false };
  const updateProfile = (field, { isRef, arrayUnion } = defaultOptions) => {
    let output = field;

    if (isRef) {
      output = null;
      let fields = Object.entries(field);
      fields.forEach(([field, values]) => {
        output = {
          ...output,
          [field]: values.map((value) => doc(db, field, value)),
        };
      });
    }

    const userDocRef = doc(db, "users", user.uid);
    return updateDoc(userDocRef, { ...output });
  };

  return { createProfile, updateProfile, profile };
};
