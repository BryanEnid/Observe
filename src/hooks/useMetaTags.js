import React from "react";
import cheerio from "cheerio-without-node-native/lib/cheerio";

export const useMetaTags = () => {
  const getMetaTagsFromURL = async (url) => {
    try {
      // Get HTML
      const res = await fetch(
        "https://mobalytics.gg/blog/tier-lists/smash-bros-ultimate/"
      );
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

  return { getMetaTagsFromURL };
};
