import {
  getStorage,
  ref,
  uploadString,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import React from "react";
import * as FileSystem from "expo-file-system";
import { uniqueId } from "lodash";

export const useStorage = () => {
  const storage = getStorage();
  // const [progress, setProgress] = React.useState(0);
  // const [error, setError] = React.useState({});

  // TODO: Test progress
  // TODO: Change this to use another that can read the file in bytes
  const saveVideo = async (name, fileURI, handleEvents) => {
    // ! Version 1

    const storageRef = ref(storage, `videos/${name}`);
    const req = await fetch(fileURI);
    const fileBlob = await req.blob();

    const uploadTask = uploadBytesResumable(storageRef, fileBlob);
    uploadTask.on("state_changed", {
      complete: handleEvents.onSuccess,
      error: handleEvents.onError,
      next: handleEvents.onNext,
    });
  };

  const savePicture = async (name, fileURI, handleEvents) => {
    const storageRef = ref(storage, `pictures/${name}`);
    const req = await fetch(fileURI);
    const fileBlob = await req.blob();

    const uploadTask = uploadBytesResumable(storageRef, fileBlob);
    uploadTask.on("state_changed", {
      complete: handleEvents.onSuccess,
      error: handleEvents.onError,
      next: handleEvents.onNext,
    });
  };

  return { saveVideo, savePicture };
};
