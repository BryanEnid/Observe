import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "native-base";
import React from "react";
import { NavigationBar } from "../../components/NavigationBar";

export const Settings = () => {
  const navigation = useNavigation();

  return (
    <>
      <NavigationBar />

      <Box justifyContent="center" alignItems="center" flex={1}>
        <Text>Settings</Text>
      </Box>
    </>
  );
};
