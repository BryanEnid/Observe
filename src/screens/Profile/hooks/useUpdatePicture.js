import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import { useUser } from "../../../hooks/useUser";
import { db, storage } from "../../../config/FirebaseConfig";

async function uploadImageAsync(uri, uid) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662

  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), `users_pictures/${uuid.v4()}.jpeg`);
    await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    const downloadUrl = await getDownloadURL(fileRef);

    // ADDING PICTURE TO USER DOCUMENT.
    const userRef = doc(db, "users", uid);

    await setDoc(userRef, {
      picture: downloadUrl,
    });

    return downloadUrl;
  } catch (error) {
    console.log({ error });
  }
}

async function getCurrentPictureUrl(uid) {
  try {
    const userRef = doc(db, "users", uid);
    const user = await getDoc(userRef);

    let response = null;
    if (user.exists()) {
      response = user.data().picture;
    }

    return response;
  } catch (error) {
    console.log({ error });
  }
}

async function deleteOldPicture(currentUrl) {
  // Create a reference to the file to delete
  if (currentUrl) {
    const urlArray = currentUrl.split("?");
    const pictureUrl = urlArray[0];
    const desertRef = ref(storage, pictureUrl);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        // console.log("document deleted successfully");
      })
      .catch((error) => {
        console.log({ error });
      });
  }
}

export default function useUpdatePicture() {
  const { user } = useUser();
  const uid = user?.uid ? user.uid : "";

  const handleLaunchCamera = async (
    setPictureUrl,
    setUpdatePicModalOpen,
    setIsloading
  ) => {
    try {
      const permission = await ImagePicker.getCameraPermissionsAsync();

      if (permission.status === "denied") {
        await ImagePicker.requestCameraPermissionsAsync();
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      setIsloading(true);
      setUpdatePicModalOpen(false);

      const currentUrl = await getCurrentPictureUrl(uid);

      await uploadImageAsync(result.uri, uid);

      deleteOldPicture(currentUrl);

      setPictureUrl(result.uri);

      setIsloading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const handlePickFromLibrary = async (
    setPictureUrl,
    setUpdatePicModalOpen,
    setIsloading
  ) => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      setIsloading(true);
      setUpdatePicModalOpen(false);

      const currentUrl = await getCurrentPictureUrl(uid);

      await uploadImageAsync(result.uri, uid);

      deleteOldPicture(currentUrl);

      setPictureUrl(result.uri);

      setIsloading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeletePicture = async (setUpdatePicModalOpen, setIsloading) => {
    console.log("delete picture");

    setIsloading(true);
    setUpdatePicModalOpen(false);
    const currentUrl = await getCurrentPictureUrl(uid);

    await updateDoc(doc(db, "users", uid), { picture: null });

    deleteOldPicture(currentUrl);
    setPictureUrl(
      "https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg"
    );
    setIsloading(false);
  };

  return {
    handleLaunchCamera,
    handlePickFromLibrary,
    handleDeletePicture,
  };
}
