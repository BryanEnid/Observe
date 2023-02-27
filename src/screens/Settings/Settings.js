import { useNavigation } from "@react-navigation/native";
import { Box, Button, Text } from "native-base";
import React from "react";
import { NavigationBar } from "../../components/NavigationBar";
import { useAuth } from "../../hooks/useAuth";

export const Settings = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate("Profile", { editMode: true });
  };

  return (
    <>
      <NavigationBar color="black" safeAreaTop />

      <Box flex={1}>
        {/* Options ... */}

        <Button variant="outline" mb={10} onPress={handleEditProfile}>
          <Text>Edit profile</Text>
        </Button>
      </Box>
      <Button mx={5} mb={10} onPress={signOut}>
        <Text color="white">Sign out</Text>
      </Button>
    </>
  );
};
