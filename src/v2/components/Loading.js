import { HStack, Spinner, Heading, Box, Center } from "native-base";
import { Dimensions } from "react-native";

export const Loading = () => {
  const { width, height } = Dimensions.get("screen");

  return (
    <Center flex={1} position={"absolute"} style={{ width, height }}>
      <HStack
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
      </HStack>
    </Center>
  );
};
