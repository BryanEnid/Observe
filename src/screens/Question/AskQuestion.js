import {
  Text,
  Box,
  Input,
  VStack,
  Pressable,
  Flex,
  Center,
  HStack,
  Button,
  Icon,
  ScrollView,
  View,
  Avatar,
} from "native-base";
import React from "react";
import { Keyboard } from "react-native";
import { NavigationBar } from "../../components/NavigationBar";
import { Feather } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";

// TODO: Create a "Select" Component to reuse
export const AskQuestionScreen = () => {
  const [questionType, setQuestionType] = React.useState("voice");
  const [destination, setDestination] = React.useState("broadly");
  const { data: profiles } = useRandomUsers({
    select: (data) => data.results,
    key: [{ amount: 30 }],
  });

  const handleSelectQuestionType = (type) => {
    if (type === questionType) return setQuestionType("");
    return setQuestionType(type);
  };

  const handleSelectDestination = (type) => {
    return setDestination(type);
  };

  return (
    <>
      <NavigationBar color="black" my={2} backButtonText="Cancel" />

      <Box flex={1} bg="gray.200">
        <Flex flexGrow={1} p={3}>
          <Pressable onPress={Keyboard.dismiss} flex={1}>
            <VStack space={10}>
              <VStack space={3}>
                <Text fontSize={16}>What's your question?</Text>
                <Input
                  placeholder="Type your question..."
                  size="md"
                  variant="filled"
                />
              </VStack>

              <VStack space={3}>
                <Text fontSize={16}>
                  How would you prefer your question to be answered? (Optional)
                </Text>

                <Button.Group isAttached colorScheme="blue" borderRadius={5}>
                  <Button
                    flex={1}
                    variant={questionType === "voice" ? "solid" : "outline"}
                    leftIcon={<Icon as={Feather} name="mic" size="sm" />}
                    onPress={() => handleSelectQuestionType("voice")}
                  >
                    Voice
                  </Button>
                  <Button
                    flex={1}
                    variant={questionType === "text" ? "solid" : "outline"}
                    leftIcon={<Icon as={Feather} name="type" size="sm" />}
                    onPress={() => handleSelectQuestionType("text")}
                  >
                    Text
                  </Button>
                  <Button
                    flex={1}
                    variant={questionType === "video" ? "solid" : "outline"}
                    leftIcon={<Icon as={Feather} name="video" size="sm" />}
                    onPress={() => handleSelectQuestionType("video")}
                  >
                    Video
                  </Button>
                </Button.Group>
              </VStack>

              <VStack space={3}>
                <Text fontSize={16}>Who are you asking this question to?</Text>

                <Button.Group isAttached colorScheme="blue" borderRadius={5}>
                  <Button
                    flex={1}
                    variant={destination === "broadly" ? "solid" : "outline"}
                    leftIcon={<Icon as={Feather} name="globe" size="sm" />}
                    onPress={() => handleSelectDestination("broadly")}
                  >
                    Broadly
                  </Button>
                  <Button
                    flex={1}
                    variant={destination === "dm" ? "solid" : "outline"}
                    leftIcon={<Icon as={Feather} name="at-sign" size="sm" />}
                    onPress={() => handleSelectDestination("dm")}
                  >
                    Direct Message
                  </Button>
                </Button.Group>
              </VStack>
            </VStack>
          </Pressable>

          {destination === "dm" && (
            <Box flex={1}>
              <Box>
                <Input
                  size={"md"}
                  variant={"filled"}
                  placeholder="Search user"
                  InputLeftElement={
                    <Icon as={Feather} name="search" size="sm" ml={4} />
                  }
                />
              </Box>

              <ScrollView
                bg="white"
                borderBottomLeftRadius={5}
                borderBottomRightRadius={5}
                px={3}
                py={2}
              >
                <Pressable flex={1} onPress={Keyboard.dismiss}>
                  {profiles.map((item) => (
                    <Box mt={3} flexDirection="row" alignItems="center">
                      <Avatar
                        source={{ uri: item.picture.medium }}
                        size="sm"
                        mr={5}
                      />
                      <Text fontSize="13">{item.name.first}</Text>
                    </Box>
                  ))}
                </Pressable>
              </ScrollView>
            </Box>
          )}
        </Flex>

        <VStack flexShrink={1} px={3} justifyContent="flex-end" safeAreaBottom>
          <Button colorScheme="blue">Next</Button>
        </VStack>
      </Box>
    </>
  );
};
