import React from "react";
import { Box, Icon, Image } from "native-base";
import { Feather } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const SkillItem = ({
  children,
  logo,
  onPress,
  selectable,
  id,
  isCurrent,
}) => {
  const [isSelected, setSelected] = React.useState(false);

  React.useEffect(() => {
    if (isCurrent) {
      handleSelected(true);
    }
  }, [isCurrent]);

  const handleSelected = (wasSelected) => {
    const action = wasSelected ?? !isSelected ? "add" : "remove";
    const payload = { id, name: children, action, logoUri: logo };
    setSelected(wasSelected ?? !isSelected);
    onPress && onPress(payload);
  };

  return (
    <TouchableWithoutFeedback onPress={selectable ? handleSelected : onPress}>
      {isSelected && selectable && (
        <Box
          w="25px"
          h="25px"
          bg="blue.400"
          borderRadius={13}
          justifyContent="center"
          alignItems="center"
          position="absolute"
          zIndex="1"
          right={-5}
          top={-3}
        >
          <Icon as={Feather} name="check" color="white" />
        </Box>
      )}

      <Box
        variant="elevated"
        mb={2}
        backgroundColor="white"
        borderRadius={30}
        borderColor={isSelected && selectable && "blue.400"}
        borderWidth={isSelected && selectable && 3}
        justifyContent="center"
        alignItems="center"
        h={"93px"}
        w={"93px"}
      >
        {typeof logo === "string" ? (
          <Box mb={1} w="100%" alignItems="center">
            <Image
              alt="logo"
              source={{ uri: logo }}
              resizeMode="contain"
              size="xs"
            />
          </Box>
        ) : (
          logo
        )}
        {children}
      </Box>
    </TouchableWithoutFeedback>
  );
};
