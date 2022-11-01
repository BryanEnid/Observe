import { useNavigation } from "@react-navigation/native";
import { Box, Button, Text } from "native-base";
import React from "react";
import { NavigationBar } from "../../components/NavigationBar";
import { useAuth } from "../../hooks/useAuth";

export const Settings = () => {
  const { signOut } = useAuth();

  return (
    <>
      <NavigationBar safeAreaTop />

      <Box flex={1}>
        <Button w="100%" variant="outline" onPress={signOut}>
          <Text>Sign out</Text>
        </Button>
      </Box>
    </>
  );
};
