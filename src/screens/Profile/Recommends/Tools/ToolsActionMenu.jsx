import React from "react";
import {
  Box,
  Text,
  useDisclose,
  HStack,
  Button,
  VStack,
  Input,
  Row,
  FlatList,
  Image,
} from "native-base";
import { Actionsheet } from "native-base";
import { Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useStorage } from "../../../../hooks/useStorage";
import { useTools } from "./useTools";
import * as ImageManipulator from "expo-image-manipulator";
import uuid from "react-native-uuid";

export const ToolsActionMenu = ({ isOpen, onClose }) => {
  // Hooks
  const Action = useDisclose();
  const { savePicture } = useStorage();
  const { submitTool } = useTools();

  // State
  const [tool, setTool] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState();
  const [isSubmitEnabled, setSubmitEnabled] = React.useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    }).catch(console.error);

    if (!result.canceled) {
      const asset = result.assets[0];
      const scale = 0.3;
      ImageManipulator.manipulateAsync(
        asset.uri,
        [
          {
            resize: {
              width: asset.width * scale,
              height: asset.height * scale,
            },
          },
        ],
        { compress: 0, format: "jpeg" }
      ).then((result) => {
        console.log(result);
        const id = uuid.v4();
        setImage({ id, ...result });
      });
    }
  };

  // Observer for disabling done button
  React.useEffect(() => {
    const req = [!isLoading, !!tool?.title?.length, !!image];
    setSubmitEnabled(!req.every(Boolean));
  }, [tool, isLoading, image]);

  React.useEffect(() => {
    isOpen && Action.onOpen();
  }, [isOpen]);

  const handleSubmit = () => {
    setLoading(true);
    savePicture(image.id, image.uri, {
      onSuccess: (imageURI) => {
        const id = uuid.v4();
        const payload = { [id]: { ...tool, imageURI: imageURI } };
        submitTool(payload);
        clear();
        onClose(payload);
      },
      onError: (e) => {
        console.error(e);
        onClose();
        setLoading(false);
      },
    }).catch((e) => {
      console.error(e);
      setLoading(false);
    });
  };

  const handleInputChange = (text, field) => {
    setTool((prev) => ({ ...prev, [field]: text }));
  };

  const handleOnClose = (...params) => {
    clear();
    onClose && onClose(...params);
  };

  const clear = () => {
    setTool({});
    setImage("");
    setLoading(false);
  };

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={handleOnClose}
      onTouchStart={Keyboard.dismiss}
    >
      <Actionsheet.Content pt={4}>
        {/* Header */}
        <HStack
          px={1}
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Button variant="link" w="75px" onPress={() => handleOnClose()}>
            <Text color="primary.500" fontWeight="bold">
              Cancel
            </Text>
          </Button>
          <Text fontSize="md" bold w="150px" textAlign="center">
            Recommend a tool
          </Text>
          <Box w="75px" />
        </HStack>

        {/* Body */}
        <VStack w="100%" space={3}>
          <Row>
            <Input
              value={tool.title}
              placeholder="Tool"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "title")}
            />
          </Row>

          {!image?.length ? (
            <Row>
              <Button onPress={pickImage}>Upload a Picture</Button>
            </Row>
          ) : (
            <Row>
              <Button bg="red.400" onPress={pickImage}>
                Cancel selection
              </Button>
            </Row>
          )}

          {image && (
            <Image
              w={100}
              h={100}
              mx={1}
              alt="previews"
              borderRadius={3}
              resizeMode="contain"
              source={{ uri: image?.uri }}
            />
          )}

          <Actionsheet.Item
            bg="primary.500"
            borderRadius={10}
            alignItems="center"
            onPress={handleSubmit}
            _pressed={{ bg: "primary.700" }}
            disabled={isSubmitEnabled}
          >
            {!isLoading ? (
              <Text fontSize={"md"} fontWeight="bold" color="white">
                Done
              </Text>
            ) : (
              <Text fontSize={"md"} fontWeight="bold" color="white">
                Uploading ...
              </Text>
            )}
          </Actionsheet.Item>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
