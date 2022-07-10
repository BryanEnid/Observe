import React from "react";
import { Box, Image, Pressable } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import wave_1 from "../../../assets/wave_1.png";
import wave_2 from "../../../assets/wave_2.png";
import wave_3 from "../../../assets/wave_3.png";
import whale from "../../../assets/whale.png";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export const ObserveMenu = () => {
  // Constants
  const OBSERVE_SPHERE_W = 80;

  // Hooks
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    menu: {
      width: OBSERVE_SPHERE_W,
      height: OBSERVE_SPHERE_W,
      position: "absolute",
      bottom: insets.bottom + 10,
      left: "50%",
      transform: [{ translateX: -OBSERVE_SPHERE_W / 2 }],
      overflow: "hidden",

      backgroundColor: "#609ff7",
      borderRadius: OBSERVE_SPHERE_W / 2,
      borderWidth: 4,
      borderColor: "#609ff7",
    },
    whale: {
      position: "absolute",
      transform: [{ scale: 0.3 }, { translateX: -245 }, { translateY: -240 }],
    },
    wave_1: {
      position: "absolute",
      transform: [{ scale: 0.3 }, { translateX: -1700 }, { translateY: -480 }],
      opacity: 0.5,
    },
    wave_2: {
      position: "absolute",
      transform: [{ scale: 0.3 }, { translateX: -1700 }, { translateY: -449 }],
    },
  });

  // State
  const translateX_wave_1 = useSharedValue(0);
  const translateX_wave_2 = useSharedValue(0);
  const scale_menu = useSharedValue(1);

  // Handlers
  // const handleMenuOpen = () => {
  //   console.log("pressed");
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  // };

  // const handleBeganLongPress = () => {};

  const handleLongPressEvent = (event) => {
    console.log(event);
  };

  // Animation Styles
  const r_wave_1 = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX_wave_1.value }] };
  });

  const r_wave_2 = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX_wave_2.value }] };
  });

  React.useEffect(() => {
    // wave 2
    translateX_wave_1.value = withRepeat(
      withSequence(
        withTiming(-320, { duration: 5000 }),
        withTiming(0, { duration: 5000 })
      ),
      -1,
      true
    );

    // wave 2
    translateX_wave_2.value = withRepeat(
      withSequence(
        withTiming(-320, { duration: 5000 }),
        withTiming(0, { duration: 5000 })
      ),
      -1,
      true
    );
  }, []);

  return (
    <LongPressGestureHandler
      // onBegan={handleLongPressEvent}
      onHandlerStateChange={handleLongPressEvent}
    >
      <Pressable style={styles.menu} onPress={() => {}}>
        {/* <Animated.View style={[r_wave_1]}>
        <Image alt="wave" source={wave_1} style={styles.wave_1} />
      </Animated.View> */}

        <Animated.View style={[r_wave_1]}>
          <Image alt="wave" source={wave_1} style={styles.wave_1} />
        </Animated.View>

        <Image alt="whale" source={whale} style={styles.whale} />

        <Animated.View style={[r_wave_2]}>
          <Image alt="wave" source={wave_2} style={styles.wave_2} />
        </Animated.View>
      </Pressable>
    </LongPressGestureHandler>
  );
};
