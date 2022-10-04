import React from "react";
import { Image, Pressable } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import wave_1 from "../../../assets/wave_1.png";
import wave_2 from "../../../assets/wave_2.png";
import whale from "../../../assets/whale.png";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export const ObserveSphere = ({
  onClick,
  onLongPress,
  play,
  pressable,
  scale,
}) => {
  // Constants
  const OBSERVE_SPHERE_W = 80;

  // Hooks
  // const insets = useSafeAreaInsets();
  // const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    menu: {
      width: OBSERVE_SPHERE_W,
      height: OBSERVE_SPHERE_W,
      position: "absolute",
      left: "50%",
      top: -25,
      overflow: "hidden",
      backgroundColor: "#609ff7",
      borderRadius: OBSERVE_SPHERE_W / 2,
      borderColor: "#609ff7",
      borderWidth: 4,
    },
    drawer: {
      width: OBSERVE_SPHERE_W,
      height: OBSERVE_SPHERE_W,
      position: "absolute",
      left: "50%",
      top: -25,
      overflow: "hidden",
      backgroundColor: "#333",
      borderRadius: OBSERVE_SPHERE_W / 2,
      opacity: 0.7,
    },
    whale: {
      position: "absolute",
      transform: [{ scale: 0.35 }, { translateX: -215 }, { translateY: -210 }],
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
  const scale_menu = useSharedValue(scale);
  const drawer_open = useSharedValue(false);

  React.useEffect(() => {
    if (play) {
      startWavesAnimation({ loop: true });
    }
  }, [play]);

  // Functions
  const startWavesAnimation = ({ loop } = { loop: false }) => {
    // wave 2
    translateX_wave_1.value = withRepeat(
      withSequence(
        withTiming(-320, { duration: 5000 }),
        withTiming(0, { duration: 5000 })
      ),
      loop ? Infinity : 1,
      true
    );

    // wave 2
    translateX_wave_2.value = withRepeat(
      withSequence(
        withTiming(-320, { duration: 5000 }),
        withTiming(0, { duration: 5000 })
      ),
      loop ? Infinity : 1,
      true
    );
  };

  // Handlers
  const handleLongPressEvent = ({ nativeEvent }) => {
    if (!pressable) return;
    if (nativeEvent.state === State.BEGAN) {
      // Animations
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scale_menu.value = withDelay(1000, withSpring(1.2, { velocity: 5 }));
      drawer_open.value = !drawer_open.value;

      // Callbacks
      startWavesAnimation();
      onClick && onClick();
    }
    if (nativeEvent.state === State.FAILED) {
      scale_menu.value = withSpring(scale);
    }
    if (nativeEvent.state === State.ACTIVE) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      // Callback
      onLongPress && onLongPress();
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

  const r_drawer = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -OBSERVE_SPHERE_W / 2 },
        {
          scale: withTiming(drawer_open.value ? 6 : 0, {
            easing: Easing.sin,
            duration: 150,
          }),
        },
      ],
    };
  });

  const r_wave_1 = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX_wave_1.value }] };
  });

  const r_wave_2 = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX_wave_2.value }] };
  });

  const Drawer = () => (
    <Animated.View style={[styles.drawer, r_drawer]} zIndex={1} />
  );

  return (
    <>
      <LongPressGestureHandler
        minDurationMs={1000}
        onHandlerStateChange={handleLongPressEvent}
      >
        <Pressable zIndex={2}>
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

      <Drawer />
    </>
  );
};
