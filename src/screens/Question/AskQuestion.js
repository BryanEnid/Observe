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
  FlatList,
  Divider,
} from "native-base";
import React from "react";
import { Keyboard } from "react-native";
import { NavigationBar } from "../../components/NavigationBar";
import { Feather } from "@expo/vector-icons";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";
import { useNavigation } from "@react-navigation/native";
import { usePosts } from "../../hooks/usePosts";

const UserItem = ({ item, onSelected, selected, index }) => {
  return (
    <Pressable
      p={3}
      flexDirection="row"
      alignItems="center"
      onPress={() => onSelected(index)}
      bg={selected ? "blue.600" : "white"}
    >
      <Avatar source={{ uri: item.picture.medium }} size="md" mr={5} />
      <Text
        fontSize="14"
        fontWeight="medium"
        color={selected ? "white" : "blue.600"}
      >
        @{item.login.username}
      </Text>
    </Pressable>
  );
};

// TODO: Create a "Select" Component to reuse
export const AskQuestionScreen = () => {
  const { submitPost } = usePosts();
  const navigation = useNavigation();

  const [question, setQuestion] = React.useState("");
  const [questionType, setQuestionType] = React.useState("voice");
  const [destination, setDestination] = React.useState("broadly");
  const [profiles, setProfiles] = React.useState([]);
  const [selectedProfile, setSelectedProfile] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");

  const { data } = useRandomUsers({
    select: (data) => data.results,
    key: [{ amount: 30 }],
  });

  React.useEffect(() => {
    if (data) setProfiles(data);
  }, [data]);

  React.useEffect(() => {
    if (data) {
      setSelectedProfile(null);

      if (searchInput === "") setProfiles(data);

      if (!!searchInput.length) {
        const filteredArr = profiles.filter((item) =>
          item.login.username.includes(searchInput)
        );
        setProfiles(filteredArr);
      }
    }
  }, [searchInput]);

  React.useEffect(() => {}, [selectedProfile]);

  const handleSelectedQuestionType = (type) => {
    if (type === questionType) return setQuestionType("");
    return setQuestionType(type);
  };

  const handleSelectedDestination = (type) => {
    return setDestination(type);
  };

  const handleSelectedProfile = (username) => {
    return setSelectedProfile(username);
  };

  const handleSearch = (text) => {
    return setSearchInput(text);
  };

  const handleSubmitQuestion = async () => {
    await submitPost(
      {
        question,
        questionType,
        destination,
        selectedProfile,
      },
      "question"
    );

    navigation.navigate("Feed", { refresh: true });
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
                  value={question}
                  onChangeText={setQuestion}
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
                    onPress={() => handleSelectedQuestionType("voice")}
                  >
                    Voice
                  </Button>
                  <Button
                    flex={1}
                    variant={questionType === "text" ? "solid" : "outline"}
                    leftIcon={<Icon as={Feather} name="type" size="sm" />}
                    onPress={() => handleSelectedQuestionType("text")}
                  >
                    Text
                  </Button>
                  <Button
                    flex={1}
                    variant={questionType === "video" ? "solid" : "outline"}
                    leftIcon={<Icon as={Feather} name="video" size="sm" />}
                    onPress={() => handleSelectedQuestionType("video")}
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
                    onPress={() => handleSelectedDestination("broadly")}
                  >
                    Broadly
                  </Button>
                  <Button
                    flex={1}
                    variant={destination === "dm" ? "solid" : "outline"}
                    leftIcon={<Icon as={Feather} name="at-sign" size="sm" />}
                    onPress={() => handleSelectedDestination("dm")}
                  >
                    Direct Message
                  </Button>
                </Button.Group>
              </VStack>
            </VStack>
          </Pressable>

          {destination === "dm" && (
            <VStack flex={1} space={3}>
              <Box>
                <Input
                  size={"md"}
                  variant={"filled"}
                  placeholder="Search user"
                  autoCapitalize="none"
                  value={searchInput}
                  onChangeText={handleSearch}
                  InputLeftElement={
                    <Icon as={Feather} name="search" size="sm" ml={4} />
                  }
                />
              </Box>

              <FlatList
                bg="white"
                flex={1}
                data={profiles}
                renderItem={(props) => (
                  <UserItem
                    {...props}
                    onSelected={handleSelectedProfile}
                    selected={props.index === selectedProfile}
                  />
                )}
                keyExtractor={(item) => item.login.uuid}
                borderRadius={5}
                ItemSeparatorComponent={Divider}
              />
            </VStack>
          )}
        </Flex>

        <VStack px={3} justifyContent="flex-end" safeAreaBottom>
          <Button colorScheme="blue" onPress={handleSubmitQuestion}>
            Next
          </Button>
        </VStack>
      </Box>
    </>
  );
};
