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

export const usePosts = () => {
  const { user } = useUser();

  const getPost = async (...path) => {
    const docRef = doc(db, ...path);
    return getDoc(docRef);
  };

  const getPosts = async () => {
    const output = [];
    const docRef = query(collection(db, "posts"), orderBy("created", "desc"));
    const snapshot = await getDocs(docRef);
    snapshot.forEach((docs) => {
      const document = { id: docs.id, ...docs.data() };
      output.push(document);
    });
    return output;
  };

  const submitPost = async (body, type = "question") => {
    const collectionRef = collection(db, "posts");
    return addDoc(collectionRef, {
      uid: user.uid,
      type,
      created: Timestamp.now(),
      ...body,
    });
  };

  return { getPost, getPosts, submitPost };
};
