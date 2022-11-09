import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

import { db } from "../config/FirebaseConfig";
import { useUser } from "./useUser";

export const useQuestions = () => {
  const { user } = useUser();

  const getQuestion = async (...path) => {
    const docRef = doc(db, ...path);
    return getDoc(docRef);
  };

  const getQuestions = async () => {
    const output = [];
    const docRef = query(
      collection(db, "questions"),
      orderBy("created", "desc")
    );
    const snapshot = await getDocs(docRef);
    snapshot.forEach((docs) => {
      const document = { id: docs.id, ...docs.data() };
      output.push(document);
    });
    return output;
  };

  const postQuestion = async (body) => {
    const collectionRef = collection(db, "questions");
    return addDoc(collectionRef, {
      uid: user.uid,
      created: Timestamp.now(),
      ...body,
    });
  };

  return { postQuestion, getQuestions, getQuestion };
};
