import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../../config/FirebaseConfig";
import { useUser } from "../../../../hooks/useUser";

// TODO: Add React Query
export const useVideos = () => {
  const { user } = useUser();

  const getVideosByProfileId = async (uid) => {
    const docRef = doc(db, "videos", user.uid);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  };

  const updateVideos = (state) => {
    const docRef = doc(db, "videos", user.uid);
    return setDoc(docRef, { videos: state }, { merge: true });
  };

  const submitVideo = async (body) => {
    const docRef = doc(db, "videos", user.uid);
    return setDoc(docRef, { videos: body }, { merge: true });
  };

  return { getVideosByProfileId, submitVideo, updateVideos };
};
