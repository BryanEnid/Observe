import Animated from "react-native-reanimated";

import {
  Text,
  Box,
  Pressable,
  Center,
  Image,
  IconButton,
  Icon,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import dimensions from "../../dimensions";

import { Feather } from "@expo/vector-icons";

export default function Header({
  styles,
  r_header,
  setUpdatePicModalOpen,
  profile,
}) {
  const navigation = useNavigation();

  const { PROFILE_H } = dimensions;

  return (
    <Animated.View style={[r_header, styles.header]}>
      <Box>
        <Box height={PROFILE_H} justifyContent="space-evenly">
          <VStack style={styles.menu_button} space={3}>
            <IconButton
              icon={<Icon as={Feather} name="settings" size="lg" />}
              onPress={() => {
                // Navigate to settings
                navigation.navigate("Settings");
              }}
            />
            <IconButton
              icon={<Icon as={Feather} name="more-horizontal" size="md" />}
              variant="outline"
              onPress={() => {
                // Show more options
                // console.log("in");
              }}
            />
          </VStack>

          <Center>
            <Pressable onLongPress={() => setUpdatePicModalOpen(true)}>
              <Box>
                <Image
                  source={{ uri: profile?.picture?.large }}
                  fallbackSource={{
                    uri: "https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg",
                  }}
                  style={styles.profile_picture}
                  alt="profile picture"
                />
              </Box>
            </Pressable>
          </Center>

          <Center>
            <Text>Software Engineer at Facebook</Text>
            <Text>"{profile.quote}"</Text>
          </Center>
        </Box>
      </Box>
    </Animated.View>
  );
}
