import { useNavigation } from "@react-navigation/native";
import { VStack, Box, Text, HStack, Icon, Center, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Progress } from "native-base";
import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { TextInput } from "../../components/TextInput";

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
  // React.useEffect(() => {
  //   navigation.addListener("beforeRemove", (e) => {
  //     // Prevent default behavior of leaving the screen
  //     e.preventDefault();

  //     // Prompt the user before leaving the screen
  //     Alert.alert(
  //       "Discard changes?",
  //       "You have unsaved changes. Are you sure to discard them and leave the screen?",
  //       [
  //         { text: "Don't leave", style: "cancel", onPress: () => {} },
  //         {
  //           text: "Discard",
  //           style: "destructive",
  //           // If the user confirmed, then we dispatch the action we blocked earlier
  //           // This will continue the action that had triggered the removal of the screen
  //           onPress: () => navigation.dispatch(e.data.action),
  //         },
  //       ]
  //     );
  //   });
  // }, [navigation]);

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
  const { signUp } = useAuth();

  const [hidePassword, setHidePassword] = React.useState(true);

  const [email, setEmail] = React.useState("bryanenid97@gmail.com");
  const [password, setPassword] = React.useState("123456c");
  const [isPasswordValid, setPasswordIsValid] = React.useState(true);

  const handleIsPasswordValid = (value) => {
    if (!Boolean(password.length)) return setPasswordIsValid(false);
    if (password?.length < 6) return setPasswordIsValid(false);
    return setPasswordIsValid(password === value);
  };

  const handleSignUp = () => {
    if (!isPasswordValid) return;
    signUp(email, password).catch((err) => {
      // TODO: Handle firebase errors
      reactotron.error(err);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <Box
          w="90%"
          flex={1}
          justifyContent="space-between"
          safeAreaTop
          safeAreaBottom
        >
          <Box>
            <TextInput placeholder="email" onChange={setEmail} value={email} />
            <TextInput
              placeholder="password"
              password={hidePassword}
              onChange={setPassword}
              value={password}
            />
            <TextInput
              placeholder="confirm password"
              password={hidePassword}
              onChange={handleIsPasswordValid}
              value={password}
            />

            <Button mt={5} onPress={handleSignUp}>
              <Text color={"white"} fontSize="md">
                Sign Up
              </Text>
            </Button>
          </Box>

          <Box my={8}>
            <Center>
              <Text color={"white"} mt={20} mb={5}>
                or
              </Text>
              <FederatedLoginContainer />
            </Center>
          </Box>
        </Box>
      </VStack>
    </TouchableWithoutFeedback>
  );
};
