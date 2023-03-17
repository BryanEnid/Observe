import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";
import { Box, Button, Icon, Pressable, Text } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

export function BucketAddButton({ onPress }) {
  return (
    <Pressable variant="unstyled" style={styles.bucket} onPress={onPress}>
      <Box
        style={styles.bucketImage}
        bg="#eee"
        borderWidth={3}
        borderColor="#ddd"
        justifyContent="center"
        alignItems={"center"}
      >
        <Icon as={Feather} name="plus" color="#ccc" size="50px" />
      </Box>
    </Pressable>
  );
}

export function BucketItem({ data }) {
  const { videos } = data;

  const navigation = useNavigation();

  const handleOpenBucket = () => {
    navigation.navigate("Bucket", data);
  };

  return (
    <Pressable style={styles.bucket} onPress={handleOpenBucket}>
      <Image
        alt="demo"
        style={styles.bucketImage}
        source={{ uri: videos[0].details.thumbnail }}
      />
      <Text variant="h2" style={styles.title}>
        {data.name}
      </Text>
    </Pressable>
  );
}
