import { useNavigationState } from "@react-navigation/native";
import React from "react";

export const useRouteName = () => {
  const routeName = useNavigationState(
    (state) => state?.routes?.[state?.index]?.name ?? ""
  );

  return { routeName };
};
