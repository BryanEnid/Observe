import React from "react";
import { Video, ResizeMode } from "expo-av";
import {
  Box,
  Text,
  Button,
  Center,
  HStack,
  Icon,
  VStack,
  IconButton,
  Progress,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { useStorage } from "../../hooks/useStorage";
import { useNavigation } from "@react-navigation/native";

const getFilename = (fullPath) => {
  return fullPath?.replace(/^.*[\\\/]/, "");
};

export const VideoEditor = ({ file, onClose }) => {
  // Custom hooks & Hooks
  const { saveVideo } = useStorage();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  // State
  const [progress, setProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);

  // Refs
  const videoRef = React.useRef();

  const handleVideoUpload = () => {
    if (file) {
      setIsUploading(true);
      const handleEvents = {
        onNext: ({ bytesTransferred, totalBytes }) => {
          setProgress((bytesTransferred / totalBytes) * 100);
        },
        onError: () => {
          setIsUploading(false);
        },
        onSuccess: () => {
          navigation.goBack();
          setIsUploading(false);
        },
      };
      saveVideo(getFilename(file), file, handleEvents);
    }
  };

  if (isUploading) {
    return (
      <Center w="100%" height="100%" bg="white">
        <Box w="90%" maxW="400">
          <Progress rounded="0" value={progress} mx="4" borderRadius={10} />
          <Center>
            <Text>Uploading: {Math.ceil(Number(progress))}%</Text>
          </Center>
        </Box>
      </Center>
    );
  }

  return (
    <Box flex={1} bg={"black"}>
      <Video
        style={{ flex: 1 }}
        ref={videoRef}
        source={{ uri: file }}
        onLayout={() => videoRef?.current?.playAsync()}
        resizeMode={ResizeMode.COVER}
        isLooping
      />

      {/* Overlay */}
      <Box position={"absolute"} width={width} height={height}>
        <VStack flex={1} px={5} pt={3} justifyContent="space-between">
          <Box>
            <HStack
              safeAreaTop
              justifyContent={"space-between"}
              alignItems="center"
            >
              <IconButton
                onPress={onClose}
                icon={
                  <Icon
                    as={Feather}
                    name="arrow-left"
                    size="xl"
                    color="white"
                  />
                }
                variant="solid"
                bg={"rgba(0,0,0,0.2)"}
                p={3}
                borderRadius={50}
              />
            </HStack>
          </Box>

          <Box>
            <HStack safeAreaBottom px={5} justifyContent="center">
              <Button
                variant="solid"
                bg={"rgba(0,0,0,0.2)"}
                p={3}
                px={10}
                mb={10}
                borderRadius={50}
                onPress={handleVideoUpload}
              >
                <Text color={"white"} fontSize={20}>
                  Done
                </Text>
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
