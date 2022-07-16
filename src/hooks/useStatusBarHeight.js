import { getStatusBarHeight } from "react-native-status-bar-height";

export const useStatusBarHeight = () => {
  const statusBarHeight = getStatusBarHeight();

  return { statusBarHeight };
};
