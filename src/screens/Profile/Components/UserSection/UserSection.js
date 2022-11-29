import {
  Text,
  Box,
  Pressable,
  Column,
  Center,
  Image,
  Button,
  IconButton,
  Icon,
  VStack,
  HStack,
  Modal,
} from "native-base";

import Animated from "react-native-reanimated";

export default function UserSection({
  styles,
  r_profile_name_y_translate,
  profile,
}) {
  return (
    <Animated.View style={[styles.username, r_profile_name_y_translate]}>
      <Center>
        <Text bold>
          {profile.name.first} {profile.name.last}
        </Text>
        <Text>@{profile.login.username}</Text>
      </Center>

      <Center>
        <Box borderTopWidth={1} borderColor="gray.500" w={170} />
      </Center>
    </Animated.View>
  );
}
