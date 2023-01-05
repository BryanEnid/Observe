import React from "react";
import {
  collection,
  getDocs,
  where,
  query,
  documentId,
} from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { useUser } from "./useUser";

// TODO: Add React Query
export const useSkills = () => {
  const { user, initialized } = useUser();

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

  const getSkillsByRef = (references) => {
    const output = [];
    const skillsRef = collection(db, "skills");
    const q = query(skillsRef, where(documentId(), "in", references));
    // const snapshot = getDocs(docRef);
    // snapshot.forEach((docs) => {
    //   const document = { id: docs.id, ...docs.data() };
    //   output.push(document);
    // });
    // return output;
  };

  return { getSkills, getSkillsByRef };
};
