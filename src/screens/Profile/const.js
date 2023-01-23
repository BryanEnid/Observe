import { SCREENS } from "./Screens";
import { getStatusBarHeight } from "react-native-status-bar-height";

export class Dimensions {
  static FONT_HEADER_SIZE = "lg";
  static PROFILE_NAME_H = 50;
  static PROFILE_NAME_W = 250;
  static PROFILE_H = 255;
  static NAV_BTN_W = 115;
  static NAVBAR_H = 50;
  static NAVBAR_W = this.NAV_BTN_W * SCREENS?.length;
  static HEADER_W = 400;
  static PROFILE_DIMENSIONS = { width: 180, height: 180, padding: 20 };
  static statusBarHeight = getStatusBarHeight();
}
