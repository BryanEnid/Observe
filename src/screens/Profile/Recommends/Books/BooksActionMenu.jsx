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
import { useBooks } from "../../../../hooks/useBooks";
import * as ImageManipulator from "expo-image-manipulator";
import uuid from "react-native-uuid";

const getFilename = (fullPath) => {
  return fullPath?.replace(/^.*[\\\/]/, "");
};

export const BooksActionMenu = ({ isOpen, onClose }) => {
  // Hooks
  const Action = useDisclose();
  const { saveMultiplePictures } = useStorage();
  const { submitBook } = useBooks();

  // State
  const [book, setBook] = React.useState({});
  const [isSearching, setSearching] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [isSubmitEnabled, setSubmitEnabled] = React.useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [18, 9],
      allowsMultipleSelection: true,
      orderedSelection: true,
      selectionLimit: 10,
    }).catch(console.error);

    if (!result.canceled) {
      Promise.allSettled(
        result.assets.map((image) => {
          return ImageManipulator.manipulateAsync(
            image.uri,
            [{ resize: { width: 320, height: 640 } }],
            { compress: 0, format: "jpeg" }
          );
        })
      ).then((results) => {
        const id = uuid.v4();
        setImages(results.map(({ value }) => ({ id, ...value })));
      });
    }
  };

  // Observer for disabling done button
  React.useEffect(() => {
    const req = [
      !isLoading,
      !!book?.title?.length,
      !!book?.author?.length,
      !!images?.length,
    ];

    setSubmitEnabled(!req.every(Boolean));
  }, [book, isLoading, images]);

  React.useEffect(() => {
    isOpen && Action.onOpen();
  }, [isOpen]);

  const handleSubmit = () => {
    setLoading(true);
    saveMultiplePictures(images, {
      onSuccess: (imagesURI) => {
        const id = uuid.v4();
        const payload = { [id]: { ...book, images: [...imagesURI] } };
        submitBook(payload);

        clear();
        onClose(payload);
      },
      onError: (e) => {
        console.error(e);
        onClose();
        setLoading(false);
      },
    }).catch(console.error);
    // .finally(() => setLoading(false));
  };

  const handleInputChange = (text, field) => {
    setBook((prev) => ({ ...prev, [field]: text }));
  };

  const handleOnClose = (...params) => {
    clear();
    onClose && onClose(...params);
  };

  const clear = () => {
    setBook({});
    setImages([]);
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
          <Button variant="link" w="80px" onPress={() => handleOnClose()}>
            <Text color="primary.500" fontWeight="bold">
              Cancel
            </Text>
          </Button>
          <Text fontSize="md" bold w="140px" textAlign="center">
            Add Book
          </Text>
          <Box w="80px" />
        </HStack>

        {/* Body */}
        <VStack w="100%" space={3}>
          <Row>
            <Input
              value={book.title}
              placeholder="Title"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "title")}
            />
          </Row>

          <Row>
            <Input
              value={book.author}
              placeholder="Author"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "author")}
            />
          </Row>

          <Row>
            <Input
              value={book.description}
              placeholder="Description"
              type="text"
              multiline
              h={"100px"}
              flex={1}
              onChangeText={(e) => handleInputChange(e, "description")}
            />
          </Row>

          {!images?.length ? (
            <Row>
              <Button onPress={pickImage}>Upload pictures</Button>
            </Row>
          ) : (
            <Row>
              <Button bg="red.400" onPress={pickImage}>
                Cancel selections
              </Button>
            </Row>
          )}

          <FlatList
            horizontal
            data={images}
            keyExtractor={(item) => item.assetId}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                w={100}
                h={100}
                mx={1}
                alt="previews"
                borderRadius={3}
                resizeMode="cover"
                source={{ uri: item.uri }}
              />
            )}
          />

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
