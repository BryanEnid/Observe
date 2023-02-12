import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../../config/FirebaseConfig";
import { useUser } from "../../../../hooks/useUser";

// TODO: Add React Query
export const useVideos = () => {
  const { user } = useUser();

  const getBooksByProfileId = async (uid) => {
    const docRef = doc(db, "books", user.uid);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  };

  const updateBooks = (state) => {
    const docRef = doc(db, "books", user.uid);
    return setDoc(docRef, { books: state }, { merge: true });
  };

  const submitBook = async (body) => {
    const docRef = doc(db, "books", user.uid);
    return setDoc(docRef, { books: body }, { merge: true });
  };

  return { getBooksByProfileId, submitBook, updateBooks };
};
