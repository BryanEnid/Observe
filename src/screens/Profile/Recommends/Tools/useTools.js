import React from "react";
import {
  collection,
  getDocs,
  getDoc,
  where,
  query,
  documentId,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../../config/FirebaseConfig";
import { useUser } from "../../../../hooks/useUser";

// TODO: Add React Query
export const useTools = () => {
  const { user } = useUser();

  const getToolsByProfileId = async (uid) => {
    const docRef = doc(db, "tools", user.uid);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  };

  const getToolsByRef = async (references) => {
    // if (references.length === 0) return [];
    // const output = [];
    // const skillsRef = collection(db, "skills");
    // const q = query(skillsRef, where(documentId(), "in", references));
    // const snapshot = await getDocs(q);
    // snapshot.forEach((doc) => output.push({ id: doc.id, ...doc.data() }));
    // return output;
  };

  const updateTools = (state) => {
    const docRef = doc(db, "tools", user.uid);
    return setDoc(docRef, { tools: state }, { merge: false });
  };

  const submitTool = async (body) => {
    const docRef = doc(db, "tools", user.uid);
    return setDoc(docRef, { tools: body }, { merge: true });
  };

  return { getToolsByProfileId, getToolsByRef, submitTool, updateTools };
};
