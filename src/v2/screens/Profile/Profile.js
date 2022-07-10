// import ConicalGradient from '../../components/ConicalGradient/ConicalGradient';
import React from "react";
import { StyleSheet, useWindowDimensions, StatusBar } from "react-native";
import {
  Text,
  Box,
  Pressable,
  VStack,
  Center,
  Image,
  Button,
} from "native-base";
import Animated, {
  cancelAnimation,
  interpolate,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { useRandomVideos } from "../../hooks/query/useRandomVideos";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";
import { PanGestureHandler } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-status-bar-height";

const statusBarHeight = getStatusBarHeight();

const PROFILE_DIMENSIONS = { width: 180, height: 180, padding: 20 };
const SCREENS = [
  ["Portfolio", "red.500", "1", "2", "3", "4", "5"],
  ["Audio", "green.500", "1", "2", "3", "4", "5", "6", "7", "8"],
  ["Video", "blue.500", "1"],
  ["Quests", "green.100", "1", "2", "3", "4", "5", "6", "7", "8"],
  ["Recommendation", "blue.100", "1"],
];

const PROFILE_NAME_H = 50;
const PROFILE_NAME_W = 250;
const PROFILE_H = 255;
const NAV_BTN_W = 140;
const NAVBAR_H = 50;
const NAVBAR_W = NAV_BTN_W * SCREENS.length;
const HEADER_W = 400;
const RANDOM_VIDEO = {};
const RANDOM_USER = {
  quote: "Seagulls are the eagles of the sea.",
  name: { first: "Bryan", last: "Tejada" },
};

export const Profile = () => {
  // Hooks
  const { width, height } = useWindowDimensions();
  const { data: videoURI } = useRandomVideos({
    select: ({ videos }) => {
      const randomNumber = Math.round(Math.random() * 79);
      return videos[randomNumber].video_files[0].link;
    },
    enabled: false,
  });
  const { data: profile } = useRandomUsers({
    select: ({ results }) => ({
      ...results[0],
      quote: "Seagulls are the eagles of the sea.",
    }),
  });

  // State
  const sv_x_ref = useAnimatedRef();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const nav_translate_x = useSharedValue(0);
  const nav_translate_y = useSharedValue(0);
  const portfolio_sv_y_ref = useAnimatedRef();
  const audio_sv_y_ref = useAnimatedRef();
  const video_sv_y_ref = useAnimatedRef();
  const quest_sv_y_ref = useAnimatedRef();
  const recommendation_sv_y_ref = useAnimatedRef();
  const refs = [
    portfolio_sv_y_ref,
    audio_sv_y_ref,
    video_sv_y_ref,
    quest_sv_y_ref,
    recommendation_sv_y_ref,
  ];
  const current_screen = useDerivedValue(() => {
    const result = Math.floor(translateX.value / width);
    return result < 0 ? 0 : result;
  });

  // Styles
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
      // padding: 0,
      zIndex: 2,
      display: "flex",
      justifyContent: "space-between",
    },
    navbar: {
      width: NAVBAR_W,
      position: "absolute",
      top: PROFILE_H + PROFILE_NAME_H + statusBarHeight,
      left: width / 2 - NAV_BTN_W / 2,
      // padding: 0,
      zIndex: 2,
    },
  });

  // Handlers
  const clamped_nav_scroll_x = useDerivedValue(() => {
    const Limits = -NAV_BTN_W * (SCREENS.length - 1);
    return Math.max(Math.min(nav_translate_x.value, 0), Limits);
  });

  const handleNavSelect = (event, index) => {
    sv_x_ref.current.scrollTo({ x: index * width });
  };

  // Worklets
  const handleSubscreenXScroll = useAnimatedScrollHandler({
    // TODO: This doesn't work on web
    onBeginDrag: (event, context) => {
      refs.map((ref, index) => {
        if (index === current_screen.value) return;
        scrollTo(
          ref,
          0,
          translateY.value > 254 ? 255 : translateY.value,
          false
        );
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

  const handleSubscreenYScroll = useAnimatedScrollHandler((event) => {
    // Subscreen
    translateY.value = event.contentOffset.y;

    // Navbar
    nav_translate_y.value = interpolate(
      event.contentOffset.y,
      [0, 1, PROFILE_H, PROFILE_H + 1],
      [0, -1, -PROFILE_H, -PROFILE_H]
    );
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

  if (!profile?.name) return <></>;

  // Components
  const Navbar = ({ onChange }) => {
    const Item = ({ children, index }) => (
      <Button
        height={NAVBAR_H}
        width={NAV_BTN_W}
        variant={"link"}
        onPress={(e) => onChange(e, index)}
      >
        <Text color="coolGray.500">{children}</Text>
      </Button>
    );

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
              <Item key={content[0]} index={index}>
                {content[0]}
              </Item>
            ))}
          </Box>
        </Animated.View>
      </PanGestureHandler>
    );
  };

  return (
    <>
      <Box overflowX={"hidden"} flex={1}>
        <StatusBar barStyle={"dark-content"} />

        {/* Profile */}
        <Animated.View style={[r_header, styles.header]}>
          <Box>
            <Box height={PROFILE_H} justifyContent="space-evenly">
              <Center>
                <Pressable onPress={() => {}}>
                  <Box>
                    <Image
                      source={{ uri: profile?.picture?.large }}
                      fallbackSource={{
                        uri: "https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg",
                      }}
                      style={styles.profile_picture}
                      alt="profile picture"
                    />
                  </Box>
                </Pressable>
              </Center>

              <Center>
                <Text>Software Engineer at Facebook</Text>
                <Text>"{profile.quote}"</Text>
              </Center>
            </Box>
          </Box>
        </Animated.View>

        {/* User */}
        <Animated.View style={[styles.username, r_profile_name_y_translate]}>
          <Center>
            <Text bold>
              {profile.name.first} {profile.name.last}
            </Text>
            <Text>@{profile.login.username}</Text>
          </Center>

          <Center>
            <Box borderTopWidth={1} borderColor="gray.500" w={170} />
          </Center>
        </Animated.View>

        {/* Navbar */}
        <Navbar onChange={handleNavSelect} />

        {/* RENDER SUB SCREENS */}
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
            {SCREENS.map((content, index) => (
              <Animated.ScrollView
                key={content[1]}
                onScroll={handleSubscreenYScroll}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                // ref={ref_array}
                ref={refs[index]}
              >
                <Box height={PROFILE_H} />
                <VStack
                  flex={1}
                  space={10}
                  backgroundColor={content[1]}
                  width={width}
                  pt={10}
                  minHeight={
                    height - PROFILE_NAME_H - NAVBAR_H - statusBarHeight
                  }
                >
                  {content.map((item) => (
                    <Pressable
                      backgroundColor={"gray.100"}
                      p={30}
                      mx={10}
                      borderRadius={3}
                      key={item}
                    >
                      <Center>{item}</Center>
                    </Pressable>
                  ))}
                  <Box />
                </VStack>
              </Animated.ScrollView>
            ))}
          </Animated.ScrollView>
        </Box>
      </Box>
    </>
  );
};
