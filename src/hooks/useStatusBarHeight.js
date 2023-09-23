import Constants from "expo-constants";

export const useStatusBarHeight = () => {
  const statusBarHeight = Constants.statusBarHeight;

  return { statusBarHeight };
};
