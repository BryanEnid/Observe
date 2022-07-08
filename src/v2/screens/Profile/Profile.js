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
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
} from "react-native-reanimated";
import { useRandomVideos } from "../../hooks/query/useRandomVideos";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";
import { PanGestureHandler } from "react-native-gesture-handler";

const PROFILE_DIMENSIONS = { width: 180, height: 180, padding: 20 };
const SCREENS = [
  ["red.500", "1", "2", "3", "4", "5"],
  ["green.500", "1", "2", "3", "4", "5", "6", "7", "8"],
  ["blue.500", "1"],
  ["green.100", "1", "2", "3", "4", "5", "6", "7", "8"],
  ["blue.100", "1"],
];
const PROFILE_H = 255;
const PROFILE_NAME_H = 50;
const HEADER_H = PROFILE_H + PROFILE_NAME_H;
const HEADER_W = 400;
const NAV_BTN_W = 140;
const NAVBAR_H = 50;
const NAVBAR_W = NAV_BTN_W * SCREENS.length;
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
  const scrollview_x_ref = React.useRef();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const nav_translate_x = useSharedValue(0);

  // Functions
  const updateNavTranslate = () => {
    nav_translate_x.value = interpolate(
      translateX.value,
      [0, width],
      [0, -Number(NAV_BTN_W)]
    );
  };

  // Styles
  const styles = StyleSheet.create({
    profile_picture: {
      width: PROFILE_DIMENSIONS.width - PROFILE_DIMENSIONS.padding,
      aspectRatio: 1,
      borderRadius: PROFILE_DIMENSIONS.width - PROFILE_DIMENSIONS.padding / 2,
    },
    header: {
      position: "absolute",
      top: 0,
      left: width / 2,
      width: HEADER_W,
      height: HEADER_H,
    },
    navbar: {
      position: "absolute",
      left: width / 2 - NAV_BTN_W / 2,
      top: HEADER_H,
      padding: 0,
      width: NAVBAR_W,
      zIndex: 2,
    },
  });

  // Handlers
  const nav_handler = (event, index) => {
    scrollview_x_ref.current.scrollTo({ x: index * width });
  };

  // Worklets
  const subscreen_scroll_x_handler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  const subscreen_scroll_y_handler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const clamped_nav_scroll_x = useDerivedValue(() => {
    const Limits = -NAV_BTN_W * (SCREENS.length - 1);
    return Math.max(Math.min(nav_translate_x.value, 0), Limits);
  });

  const nav_scroll_x_handler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = clamped_nav_scroll_x.value;

      cancelAnimation(nav_translate_x);
    },
    onActive: (event, context) => {
      nav_translate_x.value = event.translationX + context.translateX;
    },
    onEnd: (event, context) => {
      nav_translate_x.value = withDecay({ velocity: event.velocityX });
      // if (nav_translate_x.value > 0) nav_translate_x.value = withSpring(0);

      // // TODO: convert nav width into a constant
      // if (nav_translate_x.value < -NAVBAR_W)
      // nav_translate_x.value = withSpring(-NAVBAR_W);

      // nav_translate_x.value = withDecay({ velocity: event.velocityX });
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
    const r_translateY = interpolate(
      translateY.value,
      [0, PROFILE_H, PROFILE_H + 1],
      [0, 0, 1]
    );
    return { transform: [{ translateY: r_translateY }] };
  });

  const r_nav_y_translate = useAnimatedStyle(() => {
    const r_translateY = interpolate(
      translateY.value,
      [-1, 0, 1, HEADER_H - PROFILE_NAME_H, HEADER_H - PROFILE_NAME_H + 1],
      [1, 0, -1, -(HEADER_H - PROFILE_NAME_H), -(HEADER_H - PROFILE_NAME_H)]
    );
    return { transform: [{ translateY: r_translateY }] };
  });

  const r_nav_x_translate_gesture = useAnimatedStyle(() => {
    return { transform: [{ translateX: clamped_nav_scroll_x.value }] };
  });

  const r_nav_x_translate = useAnimatedStyle(() => {
    const r_translateX = interpolate(
      translateX.value,
      [0, width],
      [0, -Number(NAV_BTN_W)]
    );
    return { transform: [{ translateX: r_translateX }] };
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
      <PanGestureHandler onGestureEvent={nav_scroll_x_handler}>
        <Animated.View
          style={[
            styles.navbar,
            r_nav_y_translate,
            r_nav_x_translate_gesture,
            r_nav_x_translate,
          ]}
        >
          <Box flexDirection="row" safeAreaTop>
            <Item index={0}>Portfolio</Item>
            <Item index={1}>Audio</Item>
            <Item index={2}>Video</Item>
            <Item index={3}>Quests</Item>
            <Item index={4}>Recommendation</Item>
          </Box>
        </Animated.View>
      </PanGestureHandler>
    );
  };

  return (
    <>
      <Box overflowX={"hidden"}>
        <StatusBar barStyle={"dark-content"} />

        <Animated.View style={[r_header, styles.header]}>
          <Box safeAreaTop>
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

            <Animated.View
              style={[
                { height: PROFILE_NAME_H, justifyContent: "space-between" },
                r_profile_name_y_translate,
              ]}
            >
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
          </Box>
        </Animated.View>

        <Navbar
          translateX={translateX}
          translateY={translateY}
          onChange={nav_handler}
        />

        {/* RENDER SUB SCREENS */}
        <Box height={height} safeAreaTop>
          <Box height={PROFILE_NAME_H + NAVBAR_H} />
          <Animated.ScrollView
            pagingEnabled
            horizontal
            ref={scrollview_x_ref}
            showsHorizontalScrollIndicator={false}
            onScroll={subscreen_scroll_x_handler}
            onMomentumScrollEnd={updateNavTranslate}
            scrollEventThrottle={16}
          >
            {SCREENS.map((content) => (
              <Animated.ScrollView
                key={content[0]}
                onScroll={subscreen_scroll_y_handler}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
              >
                <Box height={PROFILE_H} />
                <VStack
                  flex={1}
                  space={10}
                  backgroundColor={content[0]}
                  width={width}
                  pt={10}
                >
                  {content.map((item) => (
                    <Box
                      backgroundColor={"gray.100"}
                      p={30}
                      mx={10}
                      borderRadius={3}
                      key={item}
                    >
                      <Center>{item}</Center>
                    </Box>
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
