import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Button } from "react-native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { NavigationBar } from "./NavigationBar";
import { Box } from "native-base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    flex: 1,
  },
});

export const PreviewScreen = () => {
  const { params } = useRoute();

  const video = React.useRef(null);

  return (
    <View style={styles.container}>
      <Box safeAreaTop />
      <NavigationBar color="black" />
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: params.uri }}
        shouldPlay
        resizeMode={ResizeMode.COVER}
        isLooping
      ></Video>
    </View>
  );
};
