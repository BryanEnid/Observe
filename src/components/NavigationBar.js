import { useNavigation } from "@react-navigation/native";
import { Box, IconButton, Icon } from "native-base";
import { Feather } from "@expo/vector-icons";

export const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <Box justifyContent="space-between" safeAreaTop flexDir="row" px={5}>
      <IconButton
        icon={<Icon as={Feather} name="arrow-left" size="lg" />}
        onPress={() => navigation.goBack()}
        _icon={{ color: "white" }}
      />
    </Box>
  );
};
