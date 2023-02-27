import React from "react";
import { useDummyData } from "../useDummyData";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import reactotron from "reactotron-react-native";

const x = { lol: "string" };

/**
 * React Query hook for getting random videos
 *
 * @param {UseQueryOptions} props
 * @returns {UseQueryResult}
 */
export const useRandomVideos = ({ key = [], ...rest } = { key: [] }) => {
  const { getRandomVideos } = useDummyData();
  const query = useQuery(
    ["random_videos", ...key],
    () => getRandomVideos(...key),
    {
      ...rest,
      ...{ staleTime: Infinity },
      retry: false,
    }
  );

  return query;
};
