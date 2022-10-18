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
import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { randomInteger } from "../../../utils/randomInteger";
import { formatNumber } from "../../../utils/formatNumber";

export const Question = ({ data, user }) => {
  const navigation = useNavigation();
  const likes = React.useRef(formatNumber(randomInteger(10000, 50000)));
  const comments = React.useRef(formatNumber(randomInteger(100, 1000)));
  const shares = React.useRef(formatNumber(randomInteger(100, 1000)));
  const views = React.useRef(formatNumber(randomInteger(10000, 50000)));

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
    },
  });

  return (
    <Box my={5} px={4}>
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
            data: {
              ...data,
              likes: likes.current,
              comments: comments.current,
              shares: shares.current,
              views: views.current,
            },
            user,
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
        <Avatar size="xs" mr="2" source={{ uri: user.picture.thumbnail }} />
        <Text>
          {user.name.first} {user.name.last}
        </Text>
      </Row>

      <Row space={3}>
        <Row alignItems={"center"}>
          <Icon as={Feather} name="heart" size="md" mr={1} />
          <Text>{likes.current} Likes</Text>
        </Row>

        <Row alignItems={"center"}>
          <Icon as={Feather} name="message-circle" size="md" mr={1} />
          <Text>{comments.current} Comments</Text>
        </Row>

        <Row alignItems={"center"}>
          <Icon as={Feather} name="share" size="md" mr={1} />
          <Text>{shares.current} Shares</Text>
        </Row>
      </Row>
    </Box>
  );
};
