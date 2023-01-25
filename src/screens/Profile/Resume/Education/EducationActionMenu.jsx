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
} from "native-base";
import { Actionsheet } from "native-base";
import { Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ExperienceItem } from "../../../../components/ExperienceItem";
import { useStorage } from "../../../../hooks/useStorage";
import { useProfile } from "../../../../hooks/useProfile";
import { arrayUnion } from "firebase/firestore";
import uuid from "react-native-uuid";

const getFilename = (fullPath) => {
  return fullPath?.replace(/^.*[\\\/]/, "");
};

export const EducationActionMenu = ({ isOpen, onClose }) => {
  // Hooks
  const Action = useDisclose();
  const { savePicture } = useStorage();
  const { updateProfile } = useProfile();

  // State
  const [Education, setEducation] = React.useState({});
  const [isSearching, setSearching] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 0.1,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  React.useEffect(() => {
    isOpen && Action.onOpen();
  }, [isOpen]);

  const handleSubmit = () => {
    setLoading(true);
    savePicture(getFilename(image), image, {
      onSuccess: (imageURI) => {
        const id = uuid.v4();
        const payload = { ...Education, imageURI, id };
        updateProfile({ education: arrayUnion(payload) });
        onClose(payload);
        setLoading(false);
      },
      onError: (e) => {
        console.log(e);
        onClose(payload);
        setLoading(false);
      },
    })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleInputChange = (text, field) => {
    setEducation((prev) => ({ ...prev, [field]: text }));
  };

  const handleOnClose = (...params) => {
    clear();
    onClose(...params);
  };

  const clear = () => {
    setEducation({});
    setImage(null);
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
          <Button variant="link" w="80px" onPress={() => handleOnClose()}>
            <Text color="primary.500" fontWeight="bold">
              Cancel
            </Text>
          </Button>
          <Text fontSize="md" bold w="140px" textAlign="center">
            Add Education
          </Text>
          <Box w="80px" />
        </HStack>

        {/* Body */}
        <VStack w="100%" space={3}>
          <Row>
            <Input
              placeholder="Degree"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "title")}
            />
          </Row>

          <Row>
            <Input
              placeholder="Institution"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "institution")}
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
              title={Education.title}
              subheading={Education.institution}
              video={""}
              from={Education.fromYear}
              to={Education.toYear}
              picture={image}
            />
          </Row>

          <Actionsheet.Item
            bg="primary.500"
            borderRadius={10}
            alignItems="center"
            onPress={handleSubmit}
            _pressed={{ bg: "primary.700" }}
            disabled={isLoading}
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
