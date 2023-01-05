import { useNavigation } from "@react-navigation/native";
import { VStack, Box, Text, HStack, Icon, Center, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Progress } from "native-base";
import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { TextInput } from "../../components/TextInput";
import { useProfile } from "../../hooks/useProfile";
import reactotron from "reactotron-react-native";
import { useUser } from "../../hooks/useUser";

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

  // TODO: Alerting before going back
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

  // const handlePreventGoingBack = () => {};

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
  const { initialized } = useUser();
  const { createProfile } = useProfile();

  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loadingRequest, setLoadingRequest] = React.useState(false);
  const [error, setError] = React.useState();

  const validatePassword = () => {
    if (!Boolean(password.length)) return false;
    if (password?.length < 6) return false;
    if (password !== confirmPassword) return false;
    return true;
  };

  const handleSignUp = () => {
    setLoadingRequest(true);
    const isPasswordValid = validatePassword();
    if (!isPasswordValid) return setLoadingRequest(false);

    const profilePayload = {
      firstName,
      email,
    };

    signUp(email, password, profilePayload).catch((err) => {
      // TODO: Handle firebase errors
      reactotron.error(err);
      console.error(err);
      setError(err.message);
      setLoadingRequest(false);
    });
  };

  const handleDisabledSignUpButton = () => {
    const isFirstNameValid = Boolean(firstName.length >= 3);
    const isEmailValid = Boolean(email.length);
    const isPasswordValid =
      Boolean(password.length) && Boolean(confirmPassword.length);

    const result = [isEmailValid, isPasswordValid, isFirstNameValid];

    return !result.every(Boolean);
  };

  if (!initialized) return <></>;

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
            {error && (
              <Text color={"red.500"} my={3}>
                {error}
              </Text>
            )}
            <TextInput
              placeholder="Name"
              onChange={setFirstName}
              value={firstName}
            />

            <TextInput placeholder="Email" onChange={setEmail} value={email} />

            <TextInput
              placeholder="Password"
              password={hidePassword}
              onChange={setPassword}
              value={password}
              showPassword={showPassword}
              onShowPassword={setShowPassword}
            />

            <TextInput
              placeholder="Confirm password"
              password={hidePassword}
              onChange={setConfirmPassword}
              value={confirmPassword}
              showPassword={showPassword}
              onShowPassword={setShowPassword}
            />

            <Button
              mt={5}
              onPress={handleSignUp}
              isLoading={loadingRequest}
              isDisabled={handleDisabledSignUpButton()}
            >
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
