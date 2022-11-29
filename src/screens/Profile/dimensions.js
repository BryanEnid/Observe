import SCREENS from "./screens";
import { getStatusBarHeight } from "react-native-status-bar-height";

let dimensions = {};

dimensions.PROFILE_NAME_H = 50;
dimensions.PROFILE_NAME_W = 250;
dimensions.PROFILE_H = 255;
dimensions.NAV_BTN_W = 82;
dimensions.NAVBAR_H = 50;
dimensions.NAVBAR_W = dimensions.NAV_BTN_W * SCREENS.length;
dimensions.HEADER_W = 400;
dimensions.PROFILE_DIMENSIONS = { width: 180, height: 180, padding: 20 };
dimensions.statusBarHeight = getStatusBarHeight();

export default dimensions;
