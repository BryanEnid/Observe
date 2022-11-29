import { Box, Column } from "native-base";
import { MENU_H } from "../../../../components/ObserveMenu/BottomMenu";

import dimensions from "../../dimensions";
import Animated from "react-native-reanimated";
import SCREENS from "../../screens";

const { statusBarHeight, PROFILE_NAME_H, NAVBAR_H, PROFILE_DIMENSIONS } =
  dimensions;

export default function SubScreenSection({
  height,
  sv_x_ref,
  handleSubscreenXScroll,
  handleSubscreenYScroll,
  refs,
  width,
}) {
  return (
    <Box height={height}>
      <Box height={PROFILE_NAME_H + NAVBAR_H + statusBarHeight} />
      <Animated.ScrollView
        pagingEnabled
        horizontal
        ref={sv_x_ref}
        showsHorizontalScrollIndicator={false}
        onScroll={handleSubscreenXScroll}
        scrollEventThrottle={16}
      >
        {SCREENS.map(([screenName, Screen], index) => (
          <Animated.ScrollView
            key={screenName}
            onScroll={handleSubscreenYScroll}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            ref={refs[index]}
          >
            <Box height={PROFILE_DIMENSIONS.height + 25} />
            <Column
              flex={1}
              space={10}
              width={width}
              pt={10}
              minHeight={height - PROFILE_NAME_H - NAVBAR_H}
            >
              <Screen />
              <Box height={MENU_H} />
            </Column>
          </Animated.ScrollView>
        ))}
      </Animated.ScrollView>
    </Box>
  );
}
