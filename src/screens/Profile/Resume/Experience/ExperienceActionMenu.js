import React from "react";
import {
  Box,
  Text,
  Icon,
  useDisclose,
  HStack,
  Button,
  VStack,
  Input,
  Row,
  KeyboardAvoidingView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { Actionsheet } from "native-base";
import { Keyboard, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ExperienceItem } from "./Experience";
import { useStorage } from "../../../../hooks/useStorage";
import { useProfile } from "../../../../hooks/useProfile";
import { arrayUnion } from "firebase/firestore";

const getFilename = (fullPath) => {
  return fullPath?.replace(/^.*[\\\/]/, "");
};

export const ExperienceActionMenu = ({ isOpen, onClose }) => {
  // Hooks
  const Action = useDisclose();
  const { savePicture } = useStorage();
  const { updateProfile } = useProfile();

  // State
  const [experience, setExperience] = React.useState({});
  const [isSearching, setSearching] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // React.useEffect(() => {
  // getSkills().then(setSkills).catch(console.error);
  // }, []);

  // React.useEffect(() => {
  //   if (bottomInset === 0) Keyboard.dismiss();
  // }, [bottomInset]);

  React.useEffect(() => {
    isOpen && Action.onOpen();
  }, [isOpen]);

  // const handleSelectedSkills = (skill) => {
  //   switch (skill.action) {
  //     case "add": {
  //       setSelectedSkills((prev) => ({ ...prev, [skill.id]: skill }));
  //       break;
  //     }

  //     case "remove": {
  //       setSelectedSkills((prev) => ({ ...prev, [skill.id]: null }));
  //       break;
  //     }
  //   }
  // };

  const handleSubmit = () => {
    savePicture(getFilename(image), image, {
      onSuccess: console.log,
      onError: console.log,
    });
    const payload = { ...experience, imageURI: image };

    updateProfile({ experience: arrayUnion(payload) });

    // Save
    onClose(payload);
  };

  const handleInputChange = (text, field) => {
    setExperience((prev) => ({ ...prev, [field]: text }));
  };

  const handleOnClose = (...params) => {
    clear();
    onClose(...params);
  };

  const clear = () => {
    setExperience({});
    setImage(null);
  };

  React.useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={handleOnClose}
      onTouchStart={Keyboard.dismiss}
    >
      {/* <KeyboardAvoidingView
        px={"11px"}
        behavior={Platform.os === "ios" ? "height" : "position"}
      > */}
      <Actionsheet.Content pt={4}>
        {/* Header */}
        <HStack
          px={1}
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Button variant="link" w="80px" onPress={() => handleOnClose()}>
            <Text color="primary.500" fontWeight="bold">
              Cancel
            </Text>
          </Button>
          <Text fontSize="md" bold w="140px" textAlign="center">
            Add Experience
          </Text>
          <Box w="80px" />
        </HStack>

        {/* Body */}
        <VStack w="100%" space={3}>
          <Row>
            <Input
              placeholder="Title"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "title")}
            />
          </Row>

          <Row>
            <Input
              placeholder="Company name"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "companyName")}
            />
          </Row>

          {/* <Row space={3}>
            <Input
              placeholder="Start month"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "fromMonth")}
            />
            <Input
              placeholder="End month"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "toMonth")}
            />
          </Row> */}

          <Row space={3}>
            <Input
              placeholder="Start year"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "fromYear")}
            />
            <Input
              placeholder="End year"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "toYear")}
            />
          </Row>

          <Row>
            <Input
              placeholder="Industry"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "industry")}
            />
          </Row>

          <Row>
            <Input
              placeholder="Description"
              type="text"
              multiline
              h={"100px"}
              flex={1}
              onChangeText={(e) => handleInputChange(e, "description")}
            />
          </Row>

          <Row>
            <Button onPress={pickImage}>Upload Logo</Button>
          </Row>

          <Row>
            <ExperienceItem
              title={experience.title}
              subheading={experience.companyName}
              video={""}
              from={experience.fromYear}
              to={experience.toYear}
              picture={image}
            />
          </Row>

          <Actionsheet.Item
            bg="primary.500"
            borderRadius={10}
            alignItems="center"
            onPress={handleSubmit}
            _pressed={{ bg: "primary.700" }}
          >
            <Text fontSize={"md"} fontWeight="bold" color="white">
              Done
            </Text>
          </Actionsheet.Item>
        </VStack>
      </Actionsheet.Content>
      {/* </KeyboardAvoidingView> */}
    </Actionsheet>
  );
};
