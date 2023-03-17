import React, { createContext } from "react";
import { Box, Icon, Text, useDisclose, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";
import { Actionsheet } from "native-base";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

// Constants
export const MENU_H = 60;
export const MENU_ITEM_W = "50px";

let BottomMenuState = { visible: true };

export const BottomMenuProvider = createContext(BottomMenuState).Provider;

export const ProfilePictureActionMenu = ({
  isOpen,
  onClose,
  onSelectedFile,
  onPreview,
  currentProfileURI,
}) => {
  // Hooks
  const Action = useDisclose();
  const navigation = useNavigation();

  React.useEffect(() => {
    isOpen && Action.onOpen();
  }, [isOpen]);

  const handlePickFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    if (!result.canceled) {
      const imageURI = result.assets[0].uri;
      const image = await ImageManipulator.manipulateAsync(
        imageURI,
        [{ resize: { width: 240, height: 240 } }],
        { compress: 0, format: "jpeg" }
      );

      onSelectedFile && onSelectedFile(image.uri);
    }
  };

  const handlePreviewImage = () => {
    onPreview && onPreview(currentProfileURI);
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content pt={4}>
        <VStack w="100%" space={3}>
          <Actionsheet.Item onPress={handlePreviewImage}>
            <Box flexDir="row">
              <Icon
                color="primary.500"
                as={Feather}
                name="user"
                size="lg"
                mr={3}
              />
              <Text color="primary.500" fontSize="16">
                See profile picture
              </Text>
            </Box>
          </Actionsheet.Item>

          <Actionsheet.Item onPress={handlePickFile}>
            <Box flexDir="row">
              <Icon
                color="primary.500"
                as={Feather}
                name="edit"
                size="lg"
                mr={3}
              />
              <Text color="primary.500" fontSize="16">
                Edit profile picture
              </Text>
            </Box>
          </Actionsheet.Item>

          <Actionsheet.Item onPress={onClose}>
            <Box flexDir="row">
              <Icon
                color="primary.500"
                as={Feather}
                name="x-circle"
                size="lg"
                mr={3}
              />
              <Text color="primary.500" fontSize="16">
                Cancel
              </Text>
            </Box>
          </Actionsheet.Item>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
