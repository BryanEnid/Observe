import React from "react";
import { Request } from "../controllers/Request";
import reactotron from "reactotron-react-native";

// TODO: Use React Query for this
export const useDummyData = () => {
  const getRandomUsers = React.useCallback(
    ({ amount } = { amount: 1 }, cached = true) => {
      Request.baseURL = "https://randomuser.me";
      return Request.get(`/api/?results=${amount}`, {
        cache: cached ? "force-cache" : "default",
      });
    },
    []
  );

  const getRandomPictures = React.useCallback((props, cached = true) => {
    const { orientation = "portrait", size = "medium", per_page = 80 } = props;

    Request.headers = {
      Authorization: "563492ad6f91700001000001fb15f65e0bc34e60843e76e311a7b127",
    };
    Request.baseURL = "https://api.pexels.com";
    const queryOptions = ["videos", "professional"];
    const randomQuery = Math.abs(
      Math.round(Math.random() * queryOptions.length - 1)
    );
    return Request.get(
      `/v1/search?query=${queryOptions[randomQuery]}&orientation=${orientation}&size=${size}&per_page=${per_page}`,
      { cache: cached ? "force-cache" : "default" }
    );
  }, []);

  const getRandomVideos = React.useCallback((props, cached = true) => {
    const { orientation = "portrait", size = "medium", per_page = 80 } = props;
    Request.headers = {
      Authorization: "563492ad6f91700001000001fb15f65e0bc34e60843e76e311a7b127",
    };
    Request.baseURL = "https://api.pexels.com";
    const queryOptions = ["technology", "professional"];
    let randomQuery = Math.abs(
      Math.round(Math.random() * queryOptions.length - 1)
    );
    if (cached) randomQuery = 0;

    return Request.get(
      `/videos/search?query=${queryOptions[randomQuery]}&orientation=${orientation}&size=${size}&per_page=${per_page}`,
      { cache: cached ? "force-cache" : "default" }
    );
  }, []);

  // https://fakerapi.it/it
  // const getRandomWords = React.useCallback(({}) => {}, [])

  return { getRandomUsers, getRandomPictures, getRandomVideos };
};
