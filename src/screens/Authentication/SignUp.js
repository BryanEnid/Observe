import { useNavigation } from "@react-navigation/native";
import { VStack, Box, Text, HStack, Input, Icon, Center } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Progress } from "native-base";

import React from "react";
import { Alert } from "react-native";

export const SetsOfScreensWithProgress = ({ onScreenChange, children }) => {
  const navigation = useNavigation();
  const [currentScreenIndex, setCurrentScreenIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(10);

  const isChildrenArray = Array.isArray(children);

  const Component = React.useMemo(
    () => (isChildrenArray ? children[currentScreenIndex] : children),
    [currentScreenIndex]
  );

  // Set current progress
  React.useEffect(() => {
    const currentProgress = (100 / children?.length) * (currentScreenIndex + 1);
    setProgress(currentProgress);
  }, [currentScreenIndex]);

  // Alerting before going back
  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        "Discard changes?",
        "You have unsaved changes. Are you sure to discard them and leave the screen?",
        [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Discard",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
  }, [navigation]);

  const handlePreventGoingBack = () => {};

  const handleForwards = ({ state }) => {
    if (children.length - 1 === currentScreenIndex) return;
    setCurrentScreenIndex((prev) => prev + 1);
  };

  const handleBackwards = () => {
    if (currentScreenIndex === 0) return navigation.goBack();
    setCurrentScreenIndex((prev) => prev - 1);
  };

  return (
    <>
      <Box w="90%" maxW="400" safeArea>
        {isChildrenArray && (
          <Progress colorScheme="darkBlue" value={progress} mx="4" />
        )}
      </Box>

      <Component onForward={handleForwards} onBackward={handleBackwards} />
    </>
  );
};

const TextInput = ({ placeholder, elevated, password, onChange }) => {
  return (
    <Box w="100%" variant={elevated && "elevated"}>
      <Text color="gray.500" my={1}>
        {placeholder}
      </Text>
      <Input
        autoCorrect={false}
        type={password && "password"}
        placeholder={placeholder}
        size="lg"
        bg="white"
        _hover={{ bg: "white" }}
        _focus={{ bg: "white" }}
        borderRadius="md"
        mb={5}
        onChange={onChange}
      />
    </Box>
  );
};

const FederatedLoginContainer = () => {
  return (
    <Box>
      <HStack space={6}>
        <Icon as={AntDesign} name="facebook-square" size="2xl" color="white" />
        <Icon as={AntDesign} name="google" size="2xl" color="white" />
        <Icon as={AntDesign} name="linkedin-square" size="2xl" color="white" />
        <Icon as={AntDesign} name="twitter" size="2xl" color="white" />
      </HStack>
    </Box>
  );
};

export const SignUp = () => {
  const [hidePassword, setHidePassword] = React.useState(true);

  return (
    <VStack
      flex={1}
      alignItems={"center"}
      bg={{
        linearGradient: {
          colors: ["#a2d4fc", "#0477d4"],
          start: [0.2, 0.2],
        },
      }}
    >
      <SetsOfScreensWithProgress>
        {({ onForward, onBackward }) => (
          <Box w="90%">
            <Center>
              <TextInput placeholder="username" onChange={handleUserField} />
              <TextInput
                placeholder="password"
                password={hidePassword}
                onChange={handlePasswordField}
              />

              <Text color={"white"} mt={20} mb={5}>
                or
              </Text>
              <FederatedLoginContainer />
            </Center>

            {/* <Button onPress={onForward}>Next</Button> */}
            {/* <Button onPress={onBackward}>Back</Button> */}
          </Box>
        )}

        {/* {({ onForward, onBackward }) => (
          <Center flex={1}>
            <Text>2</Text>
            <Button onPress={onForward}>Next</Button>
          </Center>
        )} */}
      </SetsOfScreensWithProgress>
    </VStack>
  );
};
