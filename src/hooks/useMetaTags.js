import React from "react";
import cheerio from "cheerio-without-node-native/lib/cheerio";

export const useMetaTags = () => {
  const getMetaTagsFromURL = async (url) => {
    try {
      // Get HTML
      const res = await fetch(url);
      const text = await res.text();

      // Load selector
      const $ = cheerio.load(text);

      const output = cheerio.text($("title"));
      console.log(output);

      return text;
    } catch (e) {
      console.error(e);
    }
  };

  return { getMetaTagsFromURL };
};
