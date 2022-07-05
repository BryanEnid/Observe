/* eslint-disable */
// https://medium.com/@linjunghsuan/implementing-a-collapsible-header-with-react-native-tab-view-24f15a685e07

// import ConicalGradient from '../../components/ConicalGradient/ConicalGradient';
import React from "react";
import { StyleSheet } from "react-native";
import { useDummyData } from "../../hooks/useDummyData";
import {
  Text,
  Box,
  Pressable,
  VStack,
  Center,
  Image,
  ScrollView,
  Button,
  HStack,
  View,
} from "native-base";
import { useRandomVideos } from "../../hooks/query/useRandomVideos";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";

const profileSize = { width: 180, height: 180, padding: 20 };

const styles = StyleSheet.create({
  profile_picture: {
    width: profileSize.width - profileSize.padding,
    aspectRatio: 1,
    borderRadius: profileSize.width - profileSize.padding / 2,
  },
});

export const Profile = () => {
  // Hooks
  const { data: videoURI } = useRandomVideos({
    select: ({ videos }) => {
      const randomNumber = Math.round(Math.random() * 79);
      return videos[randomNumber].video_files[0].link;
    },
  });
  const { data: profile } = useRandomUsers({
    select: ({ results }) => ({
      ...results[0],
      quote: "Seagulls are the eagles of the sea.",
    }),
  });

  // State
  const [selectedScreen, setScreen] = React.useState(0);

  // Callbacks
  const handleNavSelect = (index) => {
    setScreen(index);
  };

  if (!profile?.name && !videoURI) return <></>;

  return (
    <>
      <Box safeAreaTop>
        {/* Profile */}

        <VStack space={5}>
          <Center>
            <Pressable onPress={() => {}}>
              <Box>
                <Image
                  source={{ uri: profile?.picture?.large }}
                  style={styles.profile_picture}
                  alt="profile picture"
                />
              </Box>
            </Pressable>
          </Center>

          {/* Quotes */}
          <Center>
            <Text>Software Engineer at Facebook</Text>
            <Text>"{profile.quote}"</Text>
          </Center>

          {/* User name text */}
          <Center>
            <Text bold>
              {profile.name.first} {profile.name.last}
            </Text>
            <Text>@{profile.login.username}</Text>
          </Center>

          {/* Divider */}
          <Center>
            <Box borderTopWidth={1} w={170} />
          </Center>
        </VStack>
      </Box>

      <Navbar onChange={handleNavSelect} value={selectedScreen} />

      {/* RENDER SUB SCREENS */}
      <View></View>
    </>
  );
};

const Navbar = () => {
  const Item = ({ children }) => (
    <Button variant={"link"} onPress={() => console.log("pressed")}>
      <Text mx={2} my={3} color="coolGray.500">
        {children}
      </Text>
    </Button>
  );

  return (
    <Box>
      {/* <ScrollView
        horizontal
        centerContent
        showsHorizontalScrollIndicator={false}
      > */}
      <Item>Portfolio</Item>
      <Item>Audio</Item>
      <Item>Video</Item>
      <Item>Quests</Item>
      <Item>Recommendation</Item>
      {/* </ScrollView>  */}
    </Box>
  );
};
