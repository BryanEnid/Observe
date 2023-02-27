import React from "react";
import cheerio from "cheerio-without-node-native/lib/cheerio";
import { YOUTUBE_API_KEY } from "../../env";
import { getVideoId } from "../utils/getVideoID";

export const useMetaTags = () => {
  const getMetaTagsFromURL = async (url) => {
    try {
      // Get HTML
      const res = await fetch(url);
      const text = await res.text();

      // Load selector
      const $ = cheerio.load(text);

      const title = $('meta[property="og:title"]').attr("content");
      const description = $('meta[property="og:description"]').attr("content");
      const image = $('meta[property="og:image"]').attr("content");

      // console.log("text:", text);
      console.log("output:", [title, description, image]);

      return text;
    } catch (e) {
      console.error(e);
    }
  };

  const getMetaTagsFromYoutube = async (url) => {
    try {
      const videoId = getVideoId(url);
      const youtubeAPI = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;

      // Get HTML
      const res = await fetch(youtubeAPI);
      const data = await res.json();
      const { description, title, thumbnails } = data.items[0].snippet;

      return { description, title, thumbnails };
    } catch (e) {
      console.error(e);
    }
  };

  return { getMetaTagsFromURL, getMetaTagsFromYoutube };
};
