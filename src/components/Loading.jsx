import { Row, Spinner, Heading, Box, Center } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";

export const Loading = () => {
  const { width, height } = useWindowDimensions();

  return (
    <Center flex={1} position={"absolute"} style={{ width, height }}>
      <Row
        space={2}
        justifyContent="center"
        borderRadius={3}
        p={2}
        background={"white"}
      >
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </Row>
    </Center>
  );
};
