// import ConicalGradient from '../../components/ConicalGradient/ConicalGradient';
import React from "react";
import { StyleSheet, useWindowDimensions, StatusBar } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import uuid from "react-native-uuid";
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
  Spinner,
  View,
  ScrollView,
} from "native-base";

import { MENU_H } from "../../components/ObserveMenu/BottomMenu";
import { SCREENS } from "./Screens";
import { Dimensions } from "./const";
import { useProfile } from "../../hooks/useProfile";
import { ProfilePictureActionMenu } from "./Resume/ProfilePictureActionMenu";
import { useStorage } from "../../hooks/useStorage";
import { ImagePreview } from "../../components/ImagePreview";
// import { scrollTo } from "../../utils/scrollTo";
// import useProfileAnimations from "./useProfileAnimations";

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

const defaultPicture =
  "https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg";

export const Profile = (props) => {
  // Hooks
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const { profile, updateProfile } = useProfile();
  const { savePicture } = useStorage();
  const route = useRoute();

  // State
  const [isActionMenuOpen, setActionMenuOpen] = React.useState(false);
  const [profilePicture, setProfilePicture] = React.useState(defaultPicture);
  const [isPictureLoading, setPictureLoading] = React.useState(false);
  const [isEditMode, setEditMode] = React.useState(false);
  const [uriToPreview, setURItoPreview] = React.useState("");
  const [isPreviewImageVisible, setPreviewImageVisible] = React.useState(false);

  React.useEffect(() => {
    if (profile?.picture) {
      setProfilePicture(profile.picture);
      setURItoPreview(profile.picture);
      setPictureLoading(false);
    }
  }, [profile]);

  React.useEffect(() => {
    setEditMode(route?.params?.editMode ?? false);
  }, [route?.params]);

  // Styles
  const styles = StyleSheet.create({
    profile_picture: {
      width: PROFILE_DIMENSIONS.width - PROFILE_DIMENSIONS.padding,
      aspectRatio: 1,
      borderRadius: PROFILE_DIMENSIONS.width - PROFILE_DIMENSIONS.padding / 2,
      borderWidth: !profile?.picture ? 3 : null,
      borderColor: !profile?.picture ? "rgb(143, 147, 161)" : null,
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

  const handleProfilePictureActions = () => {
    setActionMenuOpen(true);
  };

  const handlePicturePreview = (uri) => {
    setActionMenuOpen(false);
    setPreviewImageVisible(true);
    setURItoPreview(uri);
  };

  const handleSelectedFile = (file) => {
    setPictureLoading(true);
    const fileName = "profile_picture_" + uuid.v4();
    savePicture(fileName, file, {
      onSuccess: (downloadURL) => {
        updateProfile({ picture: downloadURL });
        setProfilePicture(file);
        setURItoPreview(file);
        setPictureLoading(false);
      },
      onError: (e) => {
        if (e.code === "storage/quota-exceeded") {
          setProfilePicture(file);
        }
        console.error(e);
        setPictureLoading(false);
      },
    })
      .catch(console.error)
      .finally(() => {
        setActionMenuOpen(false);
      });
  };

  const handleNavSelect = () => {};

  // Components
  // TODO: REFACTOR
  const Navbar = ({ onChange }) => {
    return <></>;

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

  const handleEditMode = (props) => {
    setEditMode(props);
  };

  if (!profile) return <></>;

  return (
    <>
      {isEditMode && (
        <>
          <Box w={2} h={height} bg="green.500" position="absolute" zIndex={1} />
          <Box
            w={2}
            h={height}
            bg="green.500"
            position="absolute"
            right={0}
            zIndex={1}
          />
        </>
      )}

      <ImagePreview
        visible={isPreviewImageVisible}
        source={{ uri: uriToPreview }}
        onClose={() => setPreviewImageVisible(false)}
      />

      <ProfilePictureActionMenu
        currentProfileURI={profilePicture}
        isOpen={isActionMenuOpen}
        onClose={() => setActionMenuOpen(false)}
        onSelectedFile={handleSelectedFile}
        onPreview={handlePicturePreview}
      />

      <Box
        overflowX={"hidden"}
        flex={1}
        backgroundColor="white"
        borderColor={"green.500"}
      >
        <StatusBar barStyle={"dark-content"} />

        {/* User */}
        <View style={styles.username}>
          <Center>
            <Text bold>
              {profile.firstName} {profile.lastName}
            </Text>
            <Text>@ {profile.email}</Text>
          </Center>

          <Center>
            <Box borderTopWidth={1} borderColor="gray.500" w={170} />
          </Center>
        </View>

        {/* Navbar */}
        <Navbar onChange={handleNavSelect} />

        {/* RENDER SUB SCREENS */}
        <Box height={height}>
          <Box height={PROFILE_NAME_H + NAVBAR_H + statusBarHeight} />
          <ScrollView
            pagingEnabled
            horizontal
            // ref={sv_x_ref}
            showsHorizontalScrollIndicator={false}
            // onScroll={handleSubscreenXScroll}
            scrollEventThrottle={16}
          >
            {SCREENS.map(([screenName, Screen], index) => (
              <ScrollView
                key={screenName}
                // onScroll={handleSubscreenYScroll}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                // ref={refs[index]}
              >
                <Box height={PROFILE_DIMENSIONS.height + 25} />
                <Column
                  flex={1}
                  space={10}
                  width={width}
                  pt={10}
                  minHeight={height - PROFILE_NAME_H - NAVBAR_H}
                >
                  <Screen isEditMode={isEditMode} onEditMode={handleEditMode} />
                  <Box height={MENU_H} />
                </Column>
              </ScrollView>
            ))}
          </ScrollView>
        </Box>

        {/* Profile */}
        {/* This is at the end so the "on" events triggers */}
        <View style={styles.header}>
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
                  // Show more options
                  onPress={() => {}}
                />
              </VStack>

              <Center>
                <Pressable onPress={handleProfilePictureActions}>
                  <Box>
                    {!isPictureLoading ? (
                      <Image
                        source={{ uri: profilePicture }}
                        fallbackSource={{
                          uri: "https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg",
                        }}
                        style={styles.profile_picture}
                        alt="profile picture"
                      />
                    ) : (
                      <Box
                        borderWidth={2}
                        borderRadius={100}
                        borderColor="blue.200"
                      >
                        <Center>
                          <Spinner
                            style={styles.profile_picture}
                            color="blue.200"
                          />
                        </Center>
                      </Box>
                    )}
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
        </View>
      </Box>
    </>
  );
};
