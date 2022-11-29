import { StyleSheet } from "react-native";
import dimensions from "../dimensions";

const {
  PROFILE_NAME_H,
  PROFILE_NAME_W,
  PROFILE_H,
  NAV_BTN_W,
  NAVBAR_W,
  HEADER_W,
  PROFILE_DIMENSIONS,
  statusBarHeight,
} = dimensions;

export default function useGetStyles({ width }) {
  const styles = StyleSheet.create({
    profile_picture: {
      width: PROFILE_DIMENSIONS.width - PROFILE_DIMENSIONS.padding,
      aspectRatio: 1,
      borderRadius: PROFILE_DIMENSIONS.width - PROFILE_DIMENSIONS.padding / 2,
    },
    header: {
      height: PROFILE_H,
      width: HEADER_W,
      position: "absolute",
      top: 0 + statusBarHeight,
      left: width / 2,
    },
    username: {
      height: PROFILE_NAME_H,
      width: PROFILE_NAME_W,
      position: "absolute",
      top: PROFILE_H + statusBarHeight,
      left: width / 2 - PROFILE_NAME_W / 2,
      zIndex: 2,
      display: "flex",
      justifyContent: "space-between",
    },
    navbar: {
      width: NAVBAR_W,
      position: "absolute",
      top: PROFILE_H + PROFILE_NAME_H + statusBarHeight,
      left: width / 2 - NAV_BTN_W / 2,
      zIndex: 2,
    },
    menu_button: {
      position: "absolute",
      right: 10,
      zIndex: 2,
    },
  });

  return styles;
}
