import React from "react";
import {
  Box,
  Text,
  useDisclose,
  HStack,
  Button,
  VStack,
  Input,
  Spinner,
  Image,
  FlatList,
} from "native-base";
import { Actionsheet } from "native-base";
import { Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useStorage } from "../../../hooks/useStorage";
import { useBuckets } from "./useBuckets";
import { useKeyboardBottomInset } from "../../../hooks/useKeyboardBottomInset";
import * as VideoThumbnails from "expo-video-thumbnails";
import uuid from "react-native-uuid";

export const BooksActionMenu = ({ isOpen, onClose }) => {
  // Hooks
  const Action = useDisclose();
  const { saveMultipleVideos } = useStorage();
  const { submitBucket } = useBuckets();
  const { bottomInset } = useKeyboardBottomInset();

  // State
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [isButtonDisabled, setButtonDisabled] = React.useState(true);
  const [videos, setVideos] = React.useState([]);
  const [bucketName, setBucketName] = React.useState("");

  // React.useEffect(() => {
  //   if (Boolean(videos.length)) {
  //     handleSubmit();
  //   }
  // }, [videos]);

  React.useEffect(() => {
    setButtonDisabled(Boolean(bucketName.length));
  }, [bucketName]);

  React.useEffect(() => {
    isOpen && Action.onOpen();
  }, [isOpen]);

  const pickVideos = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      aspect: [18, 9],
      allowsMultipleSelection: true,
      orderedSelection: true,
      selectionLimit: 10,
    }).catch(console.error);

    if (!result.canceled) {
      let assets = [];
      for (let i in result.assets) {
        const item = result.assets[i];
        const { uri } = await VideoThumbnails.getThumbnailAsync(item.uri);
        assets.push({ ...item, thumbnail: uri });
      }

      setVideos(assets);
    }
  };

  const handleOnClose = (...params) => {
    clear();
    onClose && onClose(...params);
  };

  const handleSelectImages = async () => {
    setLoading(true);
    await pickVideos();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    saveMultipleVideos(videos, {
      onSuccess: (videosURI) => {
        const id = uuid.v4();
        const payload = { videos: [...videosURI], id };
        submitBucket(bucketName, payload);
        clear();
        onClose(payload);
      },
      onError: (e) => {
        console.error(e);
        onClose();
        setLoading(false);
      },
    }).catch(console.error);
  };

  const clear = () => {
    setSubmitted(false);
    setBucketName("");
    setVideos([]);
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
            Add to Bucket
          </Text>
          <Box w="80px" />
        </HStack>

        {/* Body */}
        {!videos.length ? (
          <VStack w="100%" space={3}>
            <Actionsheet.Item onPress={handleSelectImages}>
              <Box flexDir="row">
                {isLoading && <Spinner />}
                <Text color="primary.500" fontWeight="500" fontSize="16">
                  {!isLoading ? "Select from gallery" : " Loading ..."}
                </Text>
              </Box>
            </Actionsheet.Item>

            <Actionsheet.Item>
              <Text color="primary.500" fontWeight="500" fontSize="16">
                Capture with camera
              </Text>
            </Actionsheet.Item>

            {/* TODO: This option still tbd */}
            {/* <Actionsheet.Item onPress={() => {}}>
              <Text fontSize="16">Access previous posts</Text>
          </Actionsheet.Item> */}
          </VStack>
        ) : (
          <>
            <VStack space={5} width="100%">
              <FlatList
                data={videos}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    borderRadius={9}
                    mx={1}
                    source={{ uri: item.thumbnail }}
                    w={120}
                    h={120}
                  />
                )}
                horizontal
              />

              <Input placeholder="Bucket Name" onChangeText={setBucketName} />
              <Actionsheet.Item
                bg="primary.500"
                py={4}
                borderRadius={10}
                alignItems="center"
                onPress={handleSubmit}
                _pressed={{ bg: "primary.700" }}
                disabled={isButtonDisabled && isSubmitted}
              >
                <Text fontSize={"md"} fontWeight="bold" color="white">
                  {!isSubmitted ? "Done" : " Uploading ..."}
                </Text>
              </Actionsheet.Item>
            </VStack>
          </>
        )}
      </Actionsheet.Content>
    </Actionsheet>
  );
};
