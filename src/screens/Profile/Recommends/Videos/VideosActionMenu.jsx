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
  Column,
} from "native-base";
import { Actionsheet } from "native-base";
import { Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useStorage } from "../../../../hooks/useStorage";
import { useVideos } from "./useVideos";
import * as ImageManipulator from "expo-image-manipulator";
import uuid from "react-native-uuid";
import { useKeyboardBottomInset } from "../../../../hooks/useKeyboardBottomInset";
import { useMetaTags } from "../../../../hooks/useMetaTags";

const description =
  "#Zelda #TOTK #Comparison We have carefully recreated the latest trailer of Legend of Zelda: Tears of the Kingdom in Breath of the Wild, with the highest possible accuracy! Our camera work and splitscreen comparisons will highlight differences and small details - level of detail (draw distance), geography changes, additions to the map, etc.";
const title =
  "Perfect 1:1 Comparison Between Tears of the Kingdom and Breath of the Wild";
const thumbnails = {
  default: {
    height: 90,
    url: "https://i.ytimg.com/vi/5AiJQfxd8JE/default.jpg",
    width: 120,
  },
  high: {
    height: 360,
    url: "https://i.ytimg.com/vi/5AiJQfxd8JE/hqdefault.jpg",
    width: 480,
  },
  maxres: {
    height: 720,
    url: "https://i.ytimg.com/vi/5AiJQfxd8JE/maxresdefault.jpg",
    width: 1280,
  },
  medium: {
    height: 180,
    url: "https://i.ytimg.com/vi/5AiJQfxd8JE/mqdefault.jpg",
    width: 320,
  },
  standard: {
    height: 480,
    url: "https://i.ytimg.com/vi/5AiJQfxd8JE/sddefault.jpg",
    width: 640,
  },
};

export const VideosActionMenu = ({ isOpen, onClose }) => {
  // Hooks
  const Action = useDisclose();
  const { saveMultiplePictures } = useStorage();
  const { submitVideo } = useVideos();
  const { bottomInset } = useKeyboardBottomInset();
  const { getMetaTagsFromYoutube } = useMetaTags();

  // State
  const [video, setVideo] = React.useState({});
  const [videoMetaTags, setVideoMetaTags] = React.useState({});
  const [isSearching, setSearching] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [isSubmitEnabled, setSubmitEnabled] = React.useState(false);

  React.useEffect(() => {
    if (video.url) {
      getMetaTagsFromYoutube(video.url).then((data) =>
        setVideoMetaTags((prev) => ({ ...prev, ...data }))
      );
    }
  }, [video.url]);

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
    const req = [!!video?.url?.length];

    setSubmitEnabled(!req.every(Boolean));
  }, [video, isLoading]);

  React.useEffect(() => {
    isOpen && Action.onOpen();
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const id = uuid.v4();
      const payload = { [id]: { ...video, ...videoMetaTags } };

      await submitVideo(payload);

      clear();
      onClose(payload);
    } catch (e) {
      console.error(e);
      onClose();
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (text, field) => {
    setVideo((prev) => ({ ...prev, [field]: text }));
  };

  const handleOnClose = (...params) => {
    clear();
    onClose && onClose(...params);
  };

  const clear = () => {
    setVideo({});
    setVideoMetaTags({});
    setImages([]);
    setLoading(false);
  };

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={handleOnClose}
      onTouchStart={Keyboard.dismiss}
      bottom={bottomInset}
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
            Add Video
          </Text>
          <Box w="80px" />
        </HStack>

        {/* Body */}
        <VStack w="100%" space={3}>
          <Row>
            <Input
              value={video.url}
              placeholder="URL"
              type="text"
              flex={1}
              onChangeText={(e) => handleInputChange(e, "url")}
            />
          </Row>

          {videoMetaTags.title && (
            <Box
              variant="elevated"
              background="white"
              borderRadius={30}
              my={2}
              w="100%"
              h="130px"
              overflow="hidden"
            >
              <Row>
                <Column flex={3}>
                  <Image
                    w="100%"
                    h="100%"
                    alt="preview"
                    resizeMode="contain"
                    source={{ uri: videoMetaTags.thumbnails.high.url }}
                  />
                </Column>

                <Column flex={4} space={2} p="10px">
                  <Text h="25px" bold>
                    {videoMetaTags.title}
                  </Text>
                  <Text h="75px">{videoMetaTags.description}</Text>
                </Column>
              </Row>
            </Box>
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
