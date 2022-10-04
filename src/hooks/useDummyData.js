import React from "react";
import { Request } from "../controllers/Request";
import reactotron from "reactotron-react-native";

// TODO: add type definitions for intellisense

// Type definitions
export const UseRandomVideoOptions = {
  orientation: "string",
  size: "string",
  per_page: Number,
};

export const useDummyData = () => {
  const getRandomUsers = ({ amount } = { amount: 1 }, cached = true) => {
    Request.baseURL = "https://randomuser.me";
    return Request.get(`/api/?results=${amount}`, {
      cache: cached ? "force-cache" : "default",
    });
  };

  const getRandomPictures = (props, cached = true) => {
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
  };

  /**
   * @param {UseRandomVideoOptions} props
   */
  const getRandomVideos = (props) => {
    const { orientation = "portrait", size = "medium", per_page = 80 } = props;
    Request.headers = {
      Authorization: "563492ad6f91700001000001fb15f65e0bc34e60843e76e311a7b127",
    };
    Request.baseURL = "https://api.pexels.com";
    const queryOptions = ["technology", "professional", "education"];
    let randomQuery = Math.abs(
      Math.round(Math.random() * queryOptions.length - 1)
    );

    reactotron.log(queryOptions[randomQuery]);

    return Request.get(
      `/videos/search?query=${queryOptions[randomQuery]}&orientation=${orientation}&size=${size}&per_page=${per_page}`
    );
  };

  // https://fakerapi.it/it
  // const getRandomWords = React.useCallback(({}) => {}, [])

  return { getRandomUsers, getRandomPictures, getRandomVideos };
};
