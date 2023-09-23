import React from "react";
import {
  cancelAnimation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { scrollTo } from "../../utils/scrollTo";

import { SCREENS } from "./Screens";
import { Dimensions } from "./const";
import { useWindowDimensions } from "react-native";

const { PROFILE_H, NAV_BTN_W, HEADER_W } = Dimensions;

export default function useProfileAnimations() {
  // Hooks
  const { width } = useWindowDimensions();

  // State
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const nav_translate_x = useSharedValue(0);
  const nav_translate_y = useSharedValue(0);

  // Refs
  const sv_x_ref = useAnimatedRef();

  // ! DECLARE SCREEN REFS HERE!
  // ! VERY IMPORTANT FOR MAKING NAV ANIMATIONS WORK!
  // ! Animation Refs -> check Screens.js file
  const resume_sv_y_ref = useAnimatedRef();
  const recommends_sv_y_ref = useAnimatedRef();
  const bucket_sv_y_ref = useAnimatedRef();

  const refs = React.useMemo(
    () => [resume_sv_y_ref, recommends_sv_y_ref, bucket_sv_y_ref],
    [resume_sv_y_ref, recommends_sv_y_ref, bucket_sv_y_ref]
  );

  const current_screen = useDerivedValue(() => {
    const result = Math.floor(translateX.value / width);
    return result <= 0 ? 0 : result;
  });

  // Config Animations
  const clamped_nav_scroll_x = useDerivedValue(() => {
    const Limits = -NAV_BTN_W * (SCREENS.length - 1);
    return Math.max(Math.min(nav_translate_x.value, 0), Limits);
  });

  // Worklets
  const handleSubscreenXScroll = useAnimatedScrollHandler({
    // TODO: This doesn't work on web
    onBeginDrag: (event, context) => {
      refs.map((ref, index) => {
        if (index === current_screen.value) return;
        const y = translateY.value > 254 ? 255 : translateY.value;
        scrollTo(ref, { y, animated: false }, true);
      });
    },
    onScroll: (event, context) => {
      // Subscreen
      translateX.value = event.contentOffset.x;

      // Navbar
      nav_translate_x.value = interpolate(
        event.contentOffset.x,
        [0, width],
        [0, -Number(NAV_BTN_W)]
      );
    },
  });

  const handleSubscreenYScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      // Subscreen
      translateY.value = event.contentOffset.y;

      // Navbar
      nav_translate_y.value = interpolate(
        event.contentOffset.y,
        [0, 1, PROFILE_H, PROFILE_H + 1],
        [0, -1, -PROFILE_H, -PROFILE_H]
      );
    },
  });

  const handleNavPanGesture = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = clamped_nav_scroll_x.value;
      cancelAnimation(nav_translate_x);
    },
    onActive: (event, context) => {
      nav_translate_x.value = event.translationX + context.translateX;
    },
    onEnd: (event, context) => {
      nav_translate_x.value = withDecay({ velocity: event.velocityX });
    },
  });

  // Animations
  const r_header = useAnimatedStyle(() => {
    const r_translateY = interpolate(translateY.value, [0, 1], [0, -1]);
    return {
      transform: [{ translateY: r_translateY }, { translateX: -HEADER_W / 2 }],
    };
  });

  const r_profile_name_y_translate = useAnimatedStyle(() => {
    return { transform: [{ translateY: nav_translate_y.value }] };
  });

  const r_nav_y_translate = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: clamped_nav_scroll_x.value },
        { translateY: nav_translate_y.value },
      ],
    };
  });

  const r_nav_x_translate_gesture = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: clamped_nav_scroll_x.value },
        { translateY: nav_translate_y.value },
      ],
    };
  });

  const r_nav_x_translate = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: clamped_nav_scroll_x.value },
        { translateY: nav_translate_y.value },
      ],
    };
  });

  // Handlers
  const handleNavSelect = (event, index) => {
    refs.map((ref, i) => {
      if (i === current_screen.value) return;
      const y = translateY.value > 254 ? 255 : translateY.value;
      scrollTo(ref, { y, animated: false });
    });
    scrollTo(sv_x_ref, { x: index * width });
  };

  /**
   * ? ==== Notes ====
   * * sv: Scroll View
   * * ref: Reanimated Reference
   * * r: (Reanimated 2) Animations done with useAnimationStyle
   * * handle: Reanimated handlers
   */
  return {
    refs,
    resume_sv_y_ref,
    recommends_sv_y_ref,
    bucket_sv_y_ref,
    sv_x_ref,

    r_header,
    r_profile_name_y_translate,
    r_nav_y_translate,
    r_nav_x_translate,
    r_nav_x_translate_gesture,
    handleNavSelect,
    handleSubscreenXScroll,
    handleSubscreenYScroll,
    handleNavPanGesture,
  };
}
