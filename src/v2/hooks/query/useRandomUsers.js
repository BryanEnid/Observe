import React from "react";
import { useDummyData } from "../useDummyData";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

/**
 * React Query hook for getting random videos
 *
 * @param {UseQueryOptions} props
 * @returns {UseQueryResult}
 */
export const useRandomUsers = (props) => {
  const { getRandomUsers } = useDummyData();
  const query = useQuery("random_users", getRandomUsers, {
    ...props,
    ...{ staleTime: Infinity },
  });

  return query;
};
