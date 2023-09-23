import React from "react";
import {
  Avatar,
  Box,
  Column,
  Icon,
  Image,
  Pressable,
  Row,
  Text,
} from "native-base";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const VideoPost = ({ data }) => {
  // Custom hooks & hooks
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    video: {
      width: "100%",
      height: 250,
    },
    playButton: {
      position: "absolute",
    },
    backgroundImage: {
      flex: 1,
      alignSelf: "stretch",
      width: null,
      borderRadius: 15,
      backgroundColor: "grey",
    },
  });

  return (
    <Box m={1} p={4} bg="white" borderRadius={5}>
      <Column my={"3"}>
        <Text fontSize="13">UI/UX - 2hr ago</Text>
        <Text fontSize="16" bold>
          {data.question}
        </Text>
      </Column>

      <Pressable
        style={styles.video}
        justifyContent="center"
        alignItems={"center"}
        onPress={() => {
          navigation.navigate("Immersive", {
            data,
            user: data.user,
          });
        }}
      >
        <Image
          source={{ uri: data.image }}
          alt={data.image}
          style={styles.backgroundImage}
        />
        <Icon
          style={styles.playButton}
          as={Feather}
          name="play"
          color={"white"}
          size="xl"
          mr={1}
        />
      </Pressable>

      <Row alignItems="center" my={4}>
        <Avatar
          size="xs"
          mr="2"
          source={{ uri: data?.user && data?.user.picture.thumbnail }}
        />
        {data?.user && (
          <Text>
            {data?.user.name.first} {data?.user.name.last}
          </Text>
        )}
      </Row>

      <Row space={3}>
        <Row alignItems={"center"}>
          <Icon as={Feather} name="heart" size="md" mr={1} />
          <Text>{data.likes.current} Likes</Text>
        </Row>

        <Row alignItems={"center"}>
          <Icon as={Feather} name="message-circle" size="md" mr={1} />
          <Text>{data.comments.current} Comments</Text>
        </Row>

        <Row alignItems={"center"}>
          <Icon as={Feather} name="share" size="md" mr={1} />
          <Text>{data.shares.current} Shares</Text>
        </Row>
      </Row>
    </Box>
  );
};
