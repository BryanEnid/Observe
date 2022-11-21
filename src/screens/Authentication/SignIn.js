import React from "react";
import { Box, HStack, Text, Icon, Button, VStack, Center } from "native-base";
import { ObserveSphere } from "../../components/ObserveMenu/ObserveSphere";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import { TextInput } from "../../components/TextInput";

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

export const SignIn = () => {
  const navigation = useNavigation();
  const { anonymousSignIn, signIn } = useAuth();

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleLogin = () => {
    return signIn(email, password);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack
          alignItems="center"
          justifyContent="space-between"
          safeArea
          flex={1}
          bg={{
            linearGradient: {
              colors: ["#a2d4fc", "#0477d4"],
              start: [0.2, 0.2],
            },
          }}
        >
          <Box w="90%">
            <Center>
              {/* <Image source={logo} alt="Logo" size="xl" mt={10} /> */}
              <Box my={16}>
                <ObserveSphere play scale={1.4} />
              </Box>
            </Center>

            <Box mt={10} px={5} py={4} borderRadius={9} background="white">
              <TextInput placeholder="Username / Email" onChange={setEmail} />
              <TextInput
                placeholder="Password"
                password
                onChange={setPassword}
              />
            </Box>

            <Box my={10}>
              <Button
                bg={"transparent"}
                _pressed={{ bg: "#a2d4fc" }}
                borderColor="white"
                borderWidth={1}
                onPress={handleLogin}
              >
                Login
              </Button>

              <Button variant={"unstyled"} mt={5}>
                <Text
                  color={"white"}
                  fontSize="md"
                  onPress={() => navigation.navigate("SignUp")}
                >
                  Sign Up
                </Text>
              </Button>
            </Box>
          </Box>

          <Box safeArea>
            <Button variant={"unstyled"} mb={5}>
              <Text
                color={"white"}
                fontSize="md"
                onPress={anonymousSignIn}
                underline
              >
                or skip
              </Text>
            </Button>

            <FederatedLoginContainer />
          </Box>
        </VStack>
      </TouchableWithoutFeedback>
    </>
  );
};
