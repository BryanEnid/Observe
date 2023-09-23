import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";
import { Box, Text } from "native-base";

const { width } = Dimensions.get("screen");
const gap = 20;

const styles = StyleSheet.create({
  bucket: {
    width: width / 3 - gap,
    height: width / 3 - gap + 20,
    margin: gap / 2,
    justifyContent: "flex-end",
  },
  bucketImage: {
    width: width / 3 - gap,
    height: width / 3 - gap,
    borderRadius: width / 2,
    position: "absolute",
    top: 0,
  },
  title: { textAlign: "center" },
});

export function BucketItem({ data }) {
  const video = React.useRef(null);

  return (
    <Box style={styles.bucket}>
      <Image
        alt="demo"
        style={styles.bucketImage}
        source={{ uri: data.video_pictures[0].picture }}
      />
      <Video
        ref={video}
        style={styles.bucketImage}
        isMuted
        shouldPlay
        source={{ uri: data.video_files[0].link }}
        resizeMode="cover"
        isLooping
      />
      <Text variant="h2" style={styles.title}>
        {data.name}
      </Text>
    </Box>
  );
}
