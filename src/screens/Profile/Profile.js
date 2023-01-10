// import ConicalGradient from '../../components/ConicalGradient/ConicalGradient';
import React from "react";
import { StyleSheet, useWindowDimensions, StatusBar } from "react-native";
import {
  Text,
  Box,
  Pressable,
  Column,
  Center,
  Image,
  Button,
  IconButton,
  Icon,
  VStack,
} from "native-base";
import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import { useRandomUsers } from "../../hooks/query/useRandomUsers";
import { MENU_H } from "../../components/ObserveMenu/BottomMenu";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "./Screens";
import { Dimensions } from "./const";
import useProfileAnimations from "./useProfileAnimations";
import { useProfile } from "../../hooks/useProfile";
import reactotron from "reactotron-react-native";

const {
  PROFILE_NAME_H,
  PROFILE_NAME_W,
  PROFILE_H,
  NAV_BTN_W,
  NAVBAR_W,
  HEADER_W,
  PROFILE_DIMENSIONS,
  statusBarHeight,
  NAVBAR_H,
} = Dimensions;

export const Profile = () => {
  // Hooks
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const { profile } = useProfile();
  // const { data: profile } = useRandomUsers({
  //   select: ({ results }) => ({
  //     ...results[0],
  //     quote: "Seagulls are the eagles of the sea.",
  //   }),
  //   key: ["user", { amount: 1 }],
  // });

  const {
    handleNavSelect,
    handleNavPanGesture,
    handleSubscreenXScroll,
    handleSubscreenYScroll,
    r_header,
    r_nav_x_translate,
    r_nav_x_translate_gesture,
    r_nav_y_translate,
    r_profile_name_y_translate,
    refs,
    sv_x_ref,
  } = useProfileAnimations();

  // Styles
  const styles = StyleSheet.create({
    profile_picture: {
      width: PROFILE_DIMENSIONS.width - PROFILE_DIMENSIONS.padding,
      aspectRatio: 1,
      borderRadius: PROFILE_DIMENSIONS.width - PROFILE_DIMENSIONS.padding / 2,
      borderWidth: !profile?.picture && 3,
      borderColor: !profile?.picture && "rgb(143, 147, 161)",
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
      zIndex: 2,
      display: "flex",
      justifyContent: "space-between",
    },
    navbar: {
      width: NAVBAR_W,
      position: "absolute",
      top: PROFILE_H + PROFILE_NAME_H + statusBarHeight,
      left: width / 2 - NAV_BTN_W / 2,
      zIndex: 2,
    },
    menu_button: {
      position: "absolute",
      right: 10,
      zIndex: 2,
    },
  });

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

  if (!profile) return <></>;

  return (
    <>
      <Box overflowX={"hidden"} flex={1} backgroundColor="white">
        <StatusBar barStyle={"dark-content"} />

        {/* User */}
        <Animated.View style={[styles.username, r_profile_name_y_translate]}>
          <Center>
            <Text bold>
              {profile.firstName} {profile.lastName}
            </Text>
            <Text>@ {profile.email}</Text>
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

        {/* Profile */}
        {/* This is at the end so the "on" events triggers */}
        <Animated.View style={[r_header, styles.header]}>
          <Box>
            <Box height={PROFILE_H} justifyContent="space-evenly">
              <VStack style={styles.menu_button} space={3}>
                <IconButton
                  icon={<Icon as={Feather} name="settings" size="lg" />}
                  onPress={() => {
                    // Navigate to settings
                    navigation.navigate("Settings");
                  }}
                />
                <IconButton
                  icon={<Icon as={Feather} name="more-horizontal" size="md" />}
                  variant="outline"
                  onPress={() => {
                    // Show more options
                    // console.log("in");
                  }}
                />
              </VStack>

              <Center>
                <Pressable onPress={() => {}}>
                  <Box>
                    <Image
                      source={{
                        uri: profile?.picture
                          ? profile?.picture
                          : "https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg",
                      }}
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
                {/* TODO: Fix this hard coded text */}
                <Text>Software Engineer at Facebook</Text>
                {profile?.quote && <Text>"{profile.quote}"</Text>}
              </Center>
            </Box>
          </Box>
        </Animated.View>
      </Box>
    </>
  );
};
