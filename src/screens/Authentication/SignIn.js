import {
  Box,
  HStack,
  Image,
  Input,
  Text,
  Icon,
  Button,
  VStack,
  Center,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import logo from "../../../assets/observe_logo.png";
import { useNavigation } from "@react-navigation/native";

const TextInput = ({ placeholder, elevated, password }) => {
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

export const SignIn = () => {
  const navigation = useNavigation();

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
              <Image source={logo} alt="Logo" size="xl" mt={10} />
            </Center>

            <Box mt={10} px={5} py={4} borderRadius={9} background="white">
              <TextInput placeholder="Username / Email" />

              <TextInput placeholder="Password" password />
            </Box>

            <Box my={10}>
              <Button
                bg={"transparent"}
                _pressed={{ bg: "#a2d4fc" }}
                borderColor="white"
                borderWidth={1}
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
            <FederatedLoginContainer />
          </Box>
        </VStack>
      </TouchableWithoutFeedback>
    </>
  );
};
