import React from "react";
import { useDummyData } from "../useDummyData";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

/**
 * React Query hook for getting random videos
 *
 * @param {UseQueryOptions} props
 * @returns {UseQueryResult}
 */
export const useRandomVideos = (props) => {
  const { getRandomVideos } = useDummyData();
  const query = useQuery("random_videos", getRandomVideos, {
    ...props,
    ...{ staleTime: Infinity },
    retry: false,
  });

  return query;
};
