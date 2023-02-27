import React, { createContext } from "react";
import { Box, Icon, Text, useDisclose } from "native-base";
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
        <Actionsheet.Item onPress={handlePreviewImage}>
          <Box py={2} flexDir={"row"}>
            <Icon as={Feather} name="user" size="lg" mr={3} />
            <Text fontSize="16">See profile picture</Text>
          </Box>
        </Actionsheet.Item>

        <Actionsheet.Item onPress={handlePickFile}>
          <Box py={2} flexDir={"row"}>
            <Icon as={Feather} name="edit" size="lg" mr={3} />
            <Text fontSize="16">Edit profile picture</Text>
          </Box>
        </Actionsheet.Item>

        <Actionsheet.Item onPress={onClose}>
          <Box py={2} flexDir={"row"}>
            {/* <Icon as={Feather} name="corner-down-left" size="lg" mr={3} /> */}
            <Icon as={Feather} name="x-circle" size="lg" mr={3} />
            <Text fontSize="16">Cancel</Text>
          </Box>
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
