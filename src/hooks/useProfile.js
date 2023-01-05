import React from "react";
import {
  setDoc,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
  collection,
} from "firebase/firestore";
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
    if (user) getProfile();
  }, [initialized]);

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
    getDoc(docRef).then((doc) => {
      setProfile(doc.data());
    });
  };

  const getSkills = async () => {
    const output = [];
    const docRef = collection(db, "skills");
    const snapshot = await getDocs(docRef);
    snapshot.forEach((docs) => {
      const document = { id: docs.id, ...docs.data() };
      output.push(document);
    });
    return output;
  };

  const updateProfile = (field, { isRef }) => {
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
