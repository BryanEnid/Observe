import { useNavigation, useRoute } from "@react-navigation/native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { Avatar, Box, HStack, Icon, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { Loading } from "../../components/Loading";
import { NavigationBar } from "../../components/NavigationBar";
import { Feather } from "@expo/vector-icons";

export const Immersive = () => {
  const { params } = useRoute();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    video: {
      height,
      width,
    },
    UI: {
      position: "absolute",
      top: 0,
      backgroundColor: "transparent",
      height,
      width,
    },
  });

  return (
    <Box flex={1} bg="black">
      <Loading />

      <Video
        ref={video}
        style={styles.video}
        source={{ uri: params.data.video.link }}
        resizeMode={ResizeMode.COVER}
        isLooping
        onLayout={() => video.current.playAsync()}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      <Box style={{ position: "absolute", zIndex: 2 }}>
        <NavigationBar />
      </Box>

      {/* UI */}
      <Box style={styles.UI} justifyContent="flex-end" px={3} safeAreaBottom>
        <VStack alignItems="flex-end" space={9}>
          <Box>
            <Icon as={Feather} name="arrow-up-circle" size="lg" color="white" />
            <Text color={"white"}>asd</Text>
          </Box>

          <Box>
            <Icon as={Feather} name="message-circle" size="lg" color="white" />
            <Text color={"white"}>asd</Text>
          </Box>

          <Box>
            <Icon as={Feather} name="link" size="lg" color="white" />
            <Text color={"white"}>asd</Text>
          </Box>

          <Box>
            <Icon as={Feather} name="share-2" size="lg" color="white" />
            <Text color={"white"}>asd</Text>
          </Box>
        </VStack>

        <VStack>
          <HStack>
            <Text color="white" mr={2}>
              Question asked
            </Text>
            <Avatar
              size="xs"
              mr="2"
              source={{ uri: params.user.picture.thumbnail }}
            />
            <Text color="gray.300">
              {params.user.name.first} {params.user.name.last}
            </Text>
          </HStack>

          <Text color="gray.300" fontSize={16} fontWeight={700} my={2}>
            {params.data.question}
          </Text>

          <Icon as={Feather} name="eye" size="sm" color="white" />
        </VStack>
      </Box>
    </Box>
  );
};
