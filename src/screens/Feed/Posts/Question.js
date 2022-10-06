import { Avatar, Box, Column, Icon, Row, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export const Question = () => {
  const styles = StyleSheet.create({
    video: {
      backgroundColor: "#999",
      width: "100%",
      height: 250,
      borderRadius: 15,
    },
    playButton: {},
  });

  return (
    <Box my={5} px={4}>
      <Column my={"3"}>
        <Text fontSize="13">UI/UX - 2hr ago</Text>
        <Text fontSize="16" bold>
          How do you usually start to design a screen?
        </Text>
      </Column>

      <Row style={styles.video} justifyContent="center" alignItems={"center"}>
        <Icon
          style={styles.playButton}
          as={Feather}
          name="play"
          color={"white"}
          size="xl"
          mr={1}
        />
      </Row>

      <Row alignItems="center" my={4}>
        <Avatar size="xs" mr="2" />
        <Text>Hiro Aoyama</Text>
      </Row>

      <Row space={3}>
        <Row alignItems={"center"}>
          <Icon as={Feather} name="heart" size="md" mr={1} />
          <Text>2 Likes</Text>
        </Row>

        <Row alignItems={"center"}>
          <Icon as={Feather} name="message-circle" size="md" mr={1} />
          <Text>4 Comments</Text>
        </Row>

        <Row alignItems={"center"}>
          <Icon as={Feather} name="share" size="md" mr={1} />
          <Text>4 Shares</Text>
        </Row>
      </Row>
    </Box>
  );
};
