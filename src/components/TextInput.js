import { useNavigation } from "@react-navigation/native";
import { Box, Text, Input } from "native-base";

import React from "react";

export const TextInput = ({
  placeholder,
  elevated,
  password,
  onChange,
  isRequired,
  value,
}) => {
  return (
    <Box w="100%" variant={elevated && "elevated"}>
      <Text color="gray.500" my={1}>
        {placeholder}
      </Text>
      <Input
        autoCorrect={false}
        type={password && "password"}
        placeholder={placeholder}
        size="lg"
        bg="white"
        _hover={{ bg: "white" }}
        _focus={{ bg: "white" }}
        borderRadius="md"
        mb={5}
        onChangeText={onChange}
        value={value}
      />
      {/* TODO: Add error feedback */}
      {/* {isRequired && ...} */}
    </Box>
  );
};
