import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";

async function uploadImageAsync(uri) {
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

    return await getDownloadURL(fileRef);
  } catch (error) {
    console.log({ error });
  }
}

async function updateLocalStorage(image) {
  //TODO: UPDATE LOCAL STORAGE
  console.log("Update local storage =>", image);
}

export default function useUpdatePicture() {
  const handleLaunchCamera = async () => {
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

    const response = await uploadImageAsync(result.uri);

    updateLocalStorage(response);
  };

  const handlePickFromLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    const response = await uploadImageAsync(result.uri);

    updateLocalStorage(response);
  };

  return { handleLaunchCamera, handlePickFromLibrary };
}
