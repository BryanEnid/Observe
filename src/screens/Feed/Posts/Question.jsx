import {
  Avatar,
  Box,
  Center,
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
import { VideoPost } from "./VideoPost";

export const Question = ({ data }) => {
  const user = "";
  const likes = React.useRef(formatNumber(randomInteger(10000, 50000)));
  const comments = React.useRef(formatNumber(randomInteger(100, 1000)));
  const shares = React.useRef(formatNumber(randomInteger(100, 1000)));
  const views = React.useRef(formatNumber(randomInteger(10000, 50000)));

  if (data.questionType === "text") {
    return (
      <Box m={1} p={4} bg="white" borderRadius={5}>
        <Column>
          <Text fontSize="13">UI/UX - 2hr ago</Text>
          <Text fontSize="16" bold>
            {data.question}
          </Text>
        </Column>

        <Row alignItems="center" my={4}>
          <Avatar size="xs" mr="2" source={{ uri: user?.picture?.thumbnail }} />
          <Text>
            {user?.name?.first} {user?.name?.last}
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
  }

  if (data.questionType === "video")
    return <VideoPost data={{ ...data, likes, comments, shares, views }} />;

  // console.log(data);
  return <></>;
  // return <Center>No question type</Center>;
};
