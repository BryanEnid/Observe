import {
  collection,
  getDocs,
  where,
  query,
  documentId,
} from "firebase/firestore";
import { db } from "../../../../config/FirebaseConfig";
import { useUser } from "../../../../hooks/useUser";

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

  const getSkillsByRef = async (references) => {
    if (references.length === 0) return [];
    const output = [];
    const skillsRef = collection(db, "skills");
    const q = query(skillsRef, where(documentId(), "in", references));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => output.push({ id: doc.id, ...doc.data() }));
    return output;
  };

  return { getSkills, getSkillsByRef };
};
