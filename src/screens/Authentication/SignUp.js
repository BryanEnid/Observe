import { useNavigation } from "@react-navigation/native";
import { VStack, Box, Text, Center, Button } from "native-base";
import { Progress } from "native-base";

import React from "react";
import { Alert } from "react-native";

export const SetsOfScreensWithProgress = ({ onScreenChange, children }) => {
  const navigation = useNavigation();
  const [currentScreenIndex, setCurrentScreenIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(10);

  const Component = React.useMemo(
    () => children[currentScreenIndex],
    [currentScreenIndex]
  );

  // Set current progress
  React.useEffect(() => {
    const currentProgress = (100 / children.length) * (currentScreenIndex + 1);
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
        <Progress colorScheme="darkBlue" value={progress} mx="4" />
      </Box>

      <Component onForward={handleForwards} onBackward={handleBackwards} />
    </>
  );
};

export const SignUp = () => {
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
          <Center flex={1}>
            <Text>1</Text>
            <Button onPress={onForward}>Next</Button>
            <Button onPress={onBackward}>Back</Button>
          </Center>
        )}

        {({ onForward, onBackward }) => (
          <Center flex={1}>
            <Text>2</Text>
            <Button onPress={onForward}>Next</Button>
          </Center>
        )}
      </SetsOfScreensWithProgress>
    </VStack>
  );
};
