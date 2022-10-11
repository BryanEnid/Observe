import { useNavigation, useRoute } from "@react-navigation/native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { Box } from "native-base";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

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
  });

  return (
    <Box flex={1}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: params.data.video.link }}
        resizeMode={ResizeMode.COVER}
        isLooping
        onLayout={() => video.current.playAsync()}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </Box>
  );
};
