import React from "react";
import {
  Box,
  Text,
  Button,
  Center,
  HStack,
  Icon,
  Select,
  VStack,
  IconButton,
  ScrollView,
  FlatList,
  Divider,
  Flex,
} from "native-base";
import { Camera, CameraType } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import { Pressable, useWindowDimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { randomInteger } from "../../utils/randomInteger";
import { ObserveSphere } from "../../components/ObserveMenu/ObserveSphere";

const RANDOM_QUESTIONS = [
  {
    text: "What song was or do you want to be the your first dance at your wedding?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What song would make the best theme music for you?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the most irrational superstition you have?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the weirdest food combination you enjoy?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the stupidest thing you ever did on a dare?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the worst date you have ever been on?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "Who is the most embarrassing person you had a crush on?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is your idea of the perfect day?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If you could swap lives with one of your friends, who would it be?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "Who knows the most secrets about you?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What are your must-have qualities in a best friend?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If you had to get a tattoo today, what would you get?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If you could have free meals for life at one fast food chain, which one would you choose?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the most embarrassing thing your parents have ever done?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is a lie or exaggeration you said to impress a crush?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the silliest you have ever felt?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "When was the last time you laughed so hard that you cried?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What does your mother yell at you when she’s angry?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is a telltale sign that you are upset?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is your nickname?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the wackiest thing you ever did to help a friend?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What fictional character would you most like to be friends with?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is your favorite topic to talk about?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is your preferred method of communication?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "Where is your happy place?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "Where is your secret hideout?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What would your dream house look like?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "Which family member are you closest to?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is a habit you picked up from your parents?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the meanest thing you ever did to a sibling or that a sibling did to you?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What was your best birthday ever?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is your most treasured possession?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What three words best describe me?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "How did we first meet?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is your favorite memory of us together?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is something you would like to do together someday?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is one goal you have for the near future?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What are you looking forward to this month?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is one fact every friend should know about you?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the best meal you have ever eaten?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is one thing that only your closest friends and family know about you?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What do you think the meaning of life is?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If money were no object, what would you do?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If you found out you were going to die tomorrow, what would you do today?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the most unexpected piece of advice you ever received?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If you could ask your future self one question, what would it be?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If you could tell your past self one thing, what would it be?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If you could ask one question to an all-knowing being, what would it be?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What do you think happens after death?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the most profound experience you have ever had with a stranger?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the biggest risk you have ever taken?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is an ideal that is most worth sacrificing for?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is a moment you realized you were wrong and what was the cause of this epiphany?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is one concept you cannot understand, no matter how hard you try?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is one item on your bucket list?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is your personal mantra?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What event changed your perspective on life?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the most unexpected turn your life took?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If you could change one historic event, which one would it be?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is one opinion from the opposing political party you actually agree with?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What quote most resonates with you?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What was the most humbling moment in your life so far?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "How do you make the world a better place?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What do you consider to be your personal calling?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What do you think we owe each other as human beings?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If you weren’t afraid of failure, what would you do differently?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is your most treasured memory?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "Who from your past that you’ve fallen out of touch with would you most like to reconnect with?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "Would you want to learn what people really thought of you?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What personal quality do you most want to improve?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the best thing in life?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is your general outlook on life?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "Whose advice do you value the most?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is the nicest act you secretly did for someone?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "How do you make tough decisions?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "Which moment in your life would you most like to do over?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "Which memory would you most like to erase, and which one would you like to remember forever?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "If you could relive one day of your life, which one would it be?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is something that you wish you could say to someone you love?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What is something that wish someone would say to you?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "When did you feel safest?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What would your younger self think of who you are today?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What brings you the most joy?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What do you want people to say about you when you are not around?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
  {
    text: "What part of your identity do you believe will never change?",
    how: randomInteger(0, 1),
    when: randomInteger(1, 31),
    whenType: randomInteger(0, 2),
  },
];

const RenderQuestion = ({ item, onSelected }) => {
  const randomHow = ["Requested", "Saved"][item.how];
  const randomWhen = item.when;
  const randomWhenType = ["mins", "hrs", "days"][item.whenType];

  return (
    <Pressable onPress={() => onSelected(item.text)}>
      <Flex flexDir="row" py={2}>
        <Box flex={4}>
          <Text>{item.text}</Text>
        </Box>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text fontSize={10}>{randomHow}</Text>
          <Text fontSize={10}>
            {randomWhen} {randomWhenType} ago
          </Text>
        </Box>
      </Flex>
    </Pressable>
  );
};

export const CaptureScreen = () => {
  const [type, setType] = React.useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showQuestionList, setShowQuestionList] = React.useState(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState("");
  const [file, setFile] = React.useState(null);
  const { width } = useWindowDimensions();

  const handleToggleQuestionList = () => {
    setShowQuestionList(!showQuestionList);
  };

  const handleToggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleSelected = (text) => {
    setSelectedQuestion(text);
    setShowQuestionList(false);
  };

  const handlePickFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setFile(result.uri);
    }
  };

  if (!permission) return <></>;

  if (!permission.granted) {
    return (
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
        <Center>We need your permission to show the camera</Center>
        <Button onPress={requestPermission}>Grant Permission</Button>
      </Box>
    );
  }

  return (
    <Box flex={1} bg={"black"}>
      <Camera flex={1} type={type}>
        <VStack flex={1} px={5} pt={3} justifyContent="space-between">
          <Box>
            <HStack
              safeAreaTop
              justifyContent={"space-between"}
              alignItems="center"
            >
              <IconButton
                onPress={handleToggleQuestionList}
                icon={<Icon as={Feather} name="list" size="xl" color="white" />}
                variant="solid"
                bg={"rgba(0,0,0,0.2)"}
                p={3}
                borderRadius={50}
              />

              <Pressable>
                <Box width={width / 3} bg="white" borderRadius={50} px={3}>
                  <Center>Surgeon</Center>
                  <Icon
                    as={Feather}
                    name="chevron-down"
                    size="md"
                    position="absolute"
                    bottom={0}
                    right={2}
                  />
                </Box>
              </Pressable>

              <Button _text variant="ghost">
                <Text color="white" fontWeight="semibold">
                  Edit
                </Text>
              </Button>
            </HStack>

            {showQuestionList && (
              <FlatList
                data={RANDOM_QUESTIONS}
                renderItem={(props) => (
                  <RenderQuestion {...props} onSelected={handleSelected} />
                )}
                ItemSeparatorComponent={Divider}
                bg="white"
                mt={3}
                mx={1}
                borderRadius={15}
                p={5}
                maxHeight={400}
              />
            )}
          </Box>

          <Box>
            <Center
              mx={10}
              mb={55}
              px={5}
              py={3}
              borderRadius={50}
              bg="gray.800"
              maxW={500}
              borderColor="gray.700"
              borderWidth={1}
            >
              <Text color="white">{selectedQuestion}</Text>
            </Center>

            <Box mb={30}>
              <ObserveSphere scale={0.9} pressable />
            </Box>

            <HStack safeAreaBottom px={5} justifyContent="space-between">
              <Box>
                <IconButton
                  variant="solid"
                  bg={"rgba(0,0,0,0.2)"}
                  p={3}
                  borderRadius={50}
                  icon={
                    <Icon as={Feather} name="watch" size="xl" color="white" />
                  }
                />
              </Box>

              <Box>
                <IconButton
                  mt={10}
                  onPress={handlePickFile}
                  variant="solid"
                  bg={"rgba(0,0,0,0.2)"}
                  p={3}
                  borderRadius={50}
                  icon={
                    <Icon as={Feather} name="image" size="xl" color="white" />
                  }
                />
              </Box>

              <Box>
                <IconButton
                  onPress={handleToggleCameraType}
                  variant="solid"
                  bg={"rgba(0,0,0,0.2)"}
                  p={3}
                  borderRadius={50}
                  icon={
                    <Icon
                      as={Feather}
                      name="refresh-cw"
                      size="xl"
                      color="white"
                    />
                  }
                />
              </Box>
            </HStack>
          </Box>
        </VStack>
      </Camera>
    </Box>
  );
};
