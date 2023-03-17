import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/FirebaseConfig";
import { useUser } from "../../../hooks/useUser";

// TODO: Add React Query
export const useBuckets = () => {
  const { user } = useUser();

  const getBucketsByProfileId = async (uid) => {
    const docRef = doc(db, "buckets", user.uid);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  };

  const updateBooks = (state) => {
    const docRef = doc(db, "books", user.uid);
    return setDoc(docRef, { books: state }, { merge: true });
  };

  const submitBucket = async (name, body) => {
    const docRef = doc(db, "buckets", user.uid);

    return setDoc(docRef, { [name]: body }, { merge: true });
  };

  return { getBucketsByProfileId, submitBucket, updateBooks };
};
