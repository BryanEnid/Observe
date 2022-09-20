import { Box, Image, Input, Text } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { useWindowDimensions } from "react-native";
import logo from "../../../assets/observe_logo.png";

export const SignIn = () => {
  const { height, width } = useWindowDimensions();

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#a2d4fc", "#0477d4"]}
        start={{ x: 0.9, y: 0.4 }}
        style={{ height, width, position: "absolute", zIndex: -1 }}
      />

      <Box justifyContent="center" alignItems="center" flex={1} p={20}>
        <Image
          source={logo}
          alt="Logo"
          size="xl"
          style={{ height: 100, width: 100 }}
        />

        {/* <Input
          shadow={2}
          placeholder="Enter your name"
          size="lg"
          bg="white"
          _hover={{ bg: "white" }}
          _focus={{ bg: "white" }}
          // bg="coolGray.800"
          // _hover={{ bg: "coolGray.900" }}
          // _focus={{ bg: "coolGray.900:alpha.70" }}
        /> */}

        <Input
          // shadow={10}
          placeholder="Username / Email"
          size="lg"
          bg="white"
          _hover={{ bg: "white" }}
          _focus={{ bg: "white", borderColor: "transparent" }}
          borderRadius="md"
          // bg="coolGray.800"
          // _hover={{ bg: "coolGray.900" }}
          // _focus={{ bg: "coolGray.900:alpha.70" }}
        />

        <Input
          type="password"
          shadow={3}
          placeholder="Password"
          size="lg"
          bg="white"
          _hover={{ bg: "white" }}
          _focus={{ bg: "white" }}
          borderRadius="md"
          // bg="coolGray.800"
          // _hover={{ bg: "coolGray.900" }}
          // _focus={{ bg: "coolGray.900:alpha.70" }}
        />
      </Box>
    </>
  );
};
