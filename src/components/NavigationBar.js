import { useNavigation } from "@react-navigation/native";
import { Box, IconButton, Icon, Center, Flex, HStack, Text } from "native-base";
import { Feather } from "@expo/vector-icons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export const NavigationBar = ({
  color = "white",
  backButtonText,
  title,
  actions,
  ...rest
}) => {
  const navigation = useNavigation();

  return (
    <HStack alignItems="center" py={2} {...rest}>
      <Center flex={1}>
        <Pressable onPress={() => navigation.goBack()}>
          <Box flexDir="row" alignItems="center">
            <Icon color={color} as={Feather} name="arrow-left" size="lg" />
            <Text fontWeight="semibold" ml={2}>
              {backButtonText}
            </Text>
          </Box>
        </Pressable>
      </Center>

      <Center flex={2}>
        <Text>{title}</Text>
      </Center>

      <Center flex={1}>{actions}</Center>
    </HStack>
  );
};
