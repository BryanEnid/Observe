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

  const getBooksByProfileId = async (uid) => {
    const docRef = doc(db, "books", user.uid);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  };

  const getBooksByRef = async (references) => {
    // if (references.length === 0) return [];
    // const output = [];
    // const skillsRef = collection(db, "skills");
    // const q = query(skillsRef, where(documentId(), "in", references));
    // const snapshot = await getDocs(q);
    // snapshot.forEach((doc) => output.push({ id: doc.id, ...doc.data() }));
    // return output;
  };

  const updateBooks = (state) => {
    const docRef = doc(db, "books", user.uid);
    return setDoc(docRef, { books: state }, { merge: true });
  };

  const submitBook = async (body) => {
    const docRef = doc(db, "books", user.uid);
    return setDoc(docRef, { books: body }, { merge: true });
  };

  return { getBooksByProfileId, getBooksByRef, submitBook, updateBooks };
};
