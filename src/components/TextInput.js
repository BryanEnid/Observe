// import { useNavigation } from "@react-navigation/native";
import { Box, Text, Input, Pressable, Icon } from "native-base";
import { Feather } from "@expo/vector-icons";

import React from "react";

export const TextInput = ({
  placeholder,
  elevated,
  password,
  showPassword,
  onShowPassword,
  onChange,
  isRequired,
  value,
}) => {
  // const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Box w="100%" variant={elevated && "elevated"}>
      <Text color="gray.500" my={1}>
        {placeholder}
      </Text>
      <Input
        autoCorrect={false}
        type={password && (showPassword ? "text" : "password")}
        placeholder={placeholder}
        size="lg"
        bg="white"
        _hover={{ bg: "white" }}
        _focus={{ bg: "white" }}
        borderRadius="md"
        mb={5}
        onChangeText={onChange}
        value={value}
        InputRightElement={
          password && (
            <Pressable onPress={() => onShowPassword(!showPassword)}>
              <Icon
                as={<Feather name={showPassword ? "eye-off" : "eye"} />}
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          )
        }
      />
      {/* TODO: Add error feedback */}
      {/* {isRequired && ...} */}
    </Box>
  );
};
