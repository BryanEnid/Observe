import React from "react";
import { Image, Pressable } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import wave_1 from "../../assets/wave_1.png";
import wave_2 from "../../assets/wave_2.png";
import whale from "../../assets/whale.png";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
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
  // const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    menu: {
      width: OBSERVE_SPHERE_W,
      height: OBSERVE_SPHERE_W,
      position: "absolute",
      bottom: insets.bottom + 10,
      left: "50%",
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

  // Functions
  const startWavesAnimation = () => {
    // wave 2
    translateX_wave_1.value = withRepeat(
      withSequence(
        withTiming(-320, { duration: 5000 }),
        withTiming(0, { duration: 5000 })
      ),
      1,
      true
    );

    // wave 2
    translateX_wave_2.value = withRepeat(
      withSequence(
        withTiming(-320, { duration: 5000 }),
        withTiming(0, { duration: 5000 })
      ),
      1,
      true
    );
  };

  // Handlers
  const handleLongPressEvent = ({ nativeEvent }) => {
    tron.warn(React);
    if (nativeEvent.state === State.BEGAN) {
      startWavesAnimation();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scale_menu.value = withDelay(1000, withSpring(1.2, { velocity: 5 }));
    }
    if (nativeEvent.state === State.FAILED) {
      scale_menu.value = withSpring(1);
    }
    if (nativeEvent.state === State.ACTIVE) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    if (nativeEvent.state === State.CANCELLED) {
      scale_menu.value = withSpring(1);
    }
    if (nativeEvent.state === State.END) {
      scale_menu.value = withSpring(1);
    }
  };

  // Animation Styles
  const r_menu = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -OBSERVE_SPHERE_W / 2 },
        { scale: scale_menu.value },
      ],
    };
  });

  const r_wave_1 = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX_wave_1.value }] };
  });

  const r_wave_2 = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX_wave_2.value }] };
  });

  return (
    <LongPressGestureHandler
      minDurationMs={1000}
      onHandlerStateChange={handleLongPressEvent}
    >
      <Pressable>
        <Animated.View style={[styles.menu, r_menu]}>
          <Animated.View style={[r_wave_1]}>
            <Image alt="wave" source={wave_1} style={styles.wave_1} />
          </Animated.View>

          <Image alt="whale" source={whale} style={styles.whale} />

          <Animated.View style={[r_wave_2]}>
            <Image alt="wave" source={wave_2} style={styles.wave_2} />
          </Animated.View>
        </Animated.View>
      </Pressable>
    </LongPressGestureHandler>
  );
};
