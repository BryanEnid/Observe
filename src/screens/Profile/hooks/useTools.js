import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { db } from "../../../config/FirebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useUser } from "../../../hooks/useUser";

export default function useTools({ setShowModal }) {
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [newToolName, setNewToolName] = useState("");
  const [newToolCategory, setNewToolCategory] = useState("");
  const { user } = useUser();

  const uid = user?.uid ? user.uid : "";

  const handleAddtool = async () => {
    //TODO: ADD USER ID
    const userId = uid;
    try {
      if (newToolName === "") {
        Alert.alert("You should add a tool");
        return;
      }

      if (newToolCategory === "") {
        Alert.alert("You should select a category");
        return;
      }

      const docRef = await addDoc(collection(db, "users_tools"), {
        name: newToolName,
        category: newToolCategory,
        userUid: userId,
      });

      const toolsCopy = [...tools];
      const newId = docRef.id;
      toolsCopy.push({
        id: newId,
        name: newToolName,
        category: newToolCategory,
        userUid: userId,
      });

      setTools(toolsCopy);
      Alert.alert("Tool added successfully");
      setNewToolName("");
      setNewToolCategory("");
      setShowModal(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteTool = async (id, setDeleteToolModalOpen) => {
    try {
      await deleteDoc(doc(db, "users_tools", id));

      const toolsCopy = tools.filter((tool) => tool.id !== id);

      setTools(toolsCopy);
      setDeleteToolModalOpen(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    (async (uid) => {
      const q = query(
        collection(db, "users_tools"),
        where("userUid", "==", uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setTools(data);
    })(uid);
  }, []);

  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(collection(db, "tools_categories"));
      const data = snapshot.docs.map((doc) => {
        return doc.data().name;
      });
      setCategories(data);
    })();
  }, []);

  return {
    categories,
    setCategories,
    tools,
    handleAddtool,
    newToolName,
    newToolCategory,
    setNewToolName,
    setNewToolCategory,
    handleDeleteTool,
  };
}
