import React from "react";
import { Box, Center, Icon, Text } from "native-base";
import { Feather } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";

export const AddButton = ({ text, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Box
      variant="elevated"
      background="white"
      borderRadius={30}
      p={2}
      my={2}
      h={70}
    >
      <Center flex={1} flexDir="row">
        <Icon as={Feather} name="plus" size="4xl" color="blue.400" />
        <Text color="blue.400" fontWeight="bold">
          {text}
        </Text>
      </Center>
    </Box>
  </TouchableWithoutFeedback>
);
