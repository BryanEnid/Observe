import {
  getStorage,
  ref,
  uploadString,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import React from "react";
import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";

export const useStorage = () => {
  const storage = getStorage();
  // const [progress, setProgress] = React.useState(0);
  // const [error, setError] = React.useState({});

  // TODO: Test progress
  // TODO: Change this to use another that can read the file in bytes
  const saveVideo = async (name, fileURI, handleEvents) => {
    const storageRef = ref(storage, `videos/${name}`);
    const req = await fetch(fileURI);
    const fileBlob = await req.blob();
    const uploadTask = uploadBytesResumable(storageRef, fileBlob);
    uploadTask.on("state_changed", {
      complete: async (e) => {
        const videoURI = await getDownloadURL(storageRef);
        handleEvents.onSuccess(videoURI);
      },
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
      complete: async (e) => {
        const imageURI = await getDownloadURL(storageRef);
        handleEvents.onSuccess(imageURI);
      },
      error: handleEvents.onError,
      next: handleEvents.onNext,
    });
  };

  const saveMultiplePictures = async (images, events) => {
    Promise.allSettled(
      images.map((image, i) => {
        return new Promise((res, rej) => {
          const id = uuid.v4();
          const events = {
            onError: rej,
            onSuccess: (image) => res({ id, uri: image, order: i }),
          };
          savePicture(id, image.uri, events);
        });
      })
    )
      .then((res) => events.onSuccess(res.map(({ value }) => value)))
      .catch(events.onError);
  };

  const saveMultipleVideos = async (videos, events) => {
    Promise.allSettled(
      videos.map((video, i) => {
        return new Promise((res, rej) => {
          const id = uuid.v4();
          const events = {
            onError: rej,
            onSuccess: (uri) => res({ id, uri, order: i, details: video }),
          };
          saveVideo(id, video.uri, events);
        });
      })
    )
      .then((res) => events.onSuccess(res.map(({ value }) => value)))
      .catch(events.onError);
  };

  return { saveVideo, savePicture, saveMultiplePictures, saveMultipleVideos };
};
