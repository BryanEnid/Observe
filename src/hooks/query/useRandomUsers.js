import React from "react";
import { useDummyData } from "../useDummyData";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

/**
 * React Query hook for getting random videos
 *
 * @param {UseQueryOptions} props
 * @returns {UseQueryResult}
 */
export const useRandomUsers = ({ key = [], ...rest } = { key: [] }) => {
  const { getRandomUsers } = useDummyData();
  const query = useQuery(
    ["random_users", ...key],
    () => getRandomUsers(...key),
    {
      ...rest,
      ...{ staleTime: Infinity },
      retry: false,
    }
  );

  return query;
};
