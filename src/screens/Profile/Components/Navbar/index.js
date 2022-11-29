import dimensions from "../../dimensions";
import SCREENS from "../../screens";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Text, Box, Button } from "native-base";

const { NAVBAR_H, NAV_BTN_W } = dimensions;

const Item = ({ children, index, onChange }) => (
  <Button
    height={NAVBAR_H}
    width={NAV_BTN_W}
    variant={"link"}
    onPress={(e) => onChange(e, index)}
  >
    <Text color="coolGray.500">{children}</Text>
  </Button>
);

export default function Navbar({
  styles,
  handleNavPanGesture,
  r_nav_y_translate,
  r_nav_x_translate_gesture,
  r_nav_x_translate,
  handleNavSelect,
}) {
  return (
    <PanGestureHandler onGestureEvent={handleNavPanGesture}>
      <Animated.View
        style={[
          styles.navbar,
          r_nav_y_translate,
          r_nav_x_translate_gesture,
          r_nav_x_translate,
        ]}
      >
        <Box flexDirection="row">
          {SCREENS.map((content, index) => (
            <Item key={content[0]} index={index} onChange={handleNavSelect}>
              {content[0]}
            </Item>
          ))}
        </Box>
      </Animated.View>
    </PanGestureHandler>
  );
}
