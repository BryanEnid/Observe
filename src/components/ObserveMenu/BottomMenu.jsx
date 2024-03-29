import React, { createContext } from "react";
import { Box, Icon, Pressable, Row, Text, useDisclose } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import { ObserveSphere } from "./ObserveSphere";
import { Feather } from "@expo/vector-icons";
import { Avatar } from "native-base";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";
import { Actionsheet } from "native-base";
import { useRouteName } from "../../hooks/useRouteName";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useProfile } from "../../hooks/useProfile";

// Constants
export const MENU_H = 60;
export const MENU_ITEM_W = "50px";

let BottomMenuState = { visible: true };
const BottomMenuActions = () => ({
  toggleBottomMenu: () => {
    BottomMenuState.visible = !BottomMenuState.visible;
  },
});
export const BottomMenuProvider = createContext(BottomMenuState).Provider;

const ActionMenu = ({ isOpen, onClose }) => {
  const Action = useDisclose();
  const navigation = useNavigation();
  const route = useRoute();

  React.useEffect(() => {
    isOpen && Action.onOpen();
  }, [isOpen]);

  const handleAskQuestion = () => {
    navigation.navigate("AskQuestion");
    onClose();
  };

  const handleCreatePost = () => {
    navigation.navigate("CaptureScreen");
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content pt={4}>
        <Actionsheet.Item>
          <Box py={2} flexDir={"row"}>
            <Icon as={Feather} name="target" size="lg" mr={3} />
            <Text fontSize="16">Go Live</Text>
          </Box>
        </Actionsheet.Item>

        <Actionsheet.Item onPress={handleAskQuestion}>
          <Box py={2} flexDir={"row"}>
            <Icon as={Feather} name="message-circle" size="lg" mr={3} />
            <Text fontSize="16">Ask Question</Text>
          </Box>
        </Actionsheet.Item>

        <Actionsheet.Item onPress={handleCreatePost}>
          <Box py={2} flexDir={"row"}>
            <Icon as={Feather} name="camera" size="lg" mr={3} />
            <Text fontSize="16">Create Post</Text>
          </Box>
        </Actionsheet.Item>

        <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export const BottomMenu = ({ state, descriptors, navigation, transparent }) => {
  // Hooks
  const { width } = useWindowDimensions();
  const { profile } = useProfile();

  // State
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [isVisible, setVisible] = React.useState(true);

  const styles = StyleSheet.create({
    menu: {
      width,
      backgroundColor: transparent ? "transparent" : "white",
      shadowColor: "#333",
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.24,
      shadowRadius: 16.41,
      elevation: 20,
      zIndex: 0,
    },
  });

  const MenuItem = React.useCallback(
    (props) => {
      const isFocused = !transparent ? state?.index === props?.index : false;

      const handleOnPress = () => {
        if (!props.route) return null;

        const event = navigation.emit({
          type: "tabPress",
          target: props.route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          // The `merge: true` option makes sure that the params inside the tab screen are preserved
          navigation.navigate({ name: props.route.name });
        }
      };

      return (
        <Pressable onPress={handleOnPress}>
          <Box
            w={MENU_ITEM_W}
            h={MENU_ITEM_W}
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            borderRadius={10}
          >
            {!props?.avatar ? (
              <Icon
                as={Feather}
                name={props.iconName}
                size={isFocused ? "2xl" : "lg"}
                color={isFocused ? "#609ff7" : "gray.400"}
              />
            ) : (
              <Box
                background="#609ff7"
                p={isFocused ? 1 : 0}
                borderRadius="50%"
              >
                <Avatar size="sm" source={{ uri: props.avatar }} />
              </Box>
            )}
          </Box>
        </Pressable>
      );
    },
    [state]
  );

  const handleClick = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  if (!isVisible) return <></>;

  // ! FIXME: Why is there two UIs (?)
  if (!state)
    return (
      <>
        {/* Bottom Menu */}
        <Box style={styles.menu}>
          <Row justifyContent={"space-evenly"} zIndex={1}>
            <MenuItem iconName="life-buoy" index={0} />
            <MenuItem iconName="map" />
            <Box w={MENU_ITEM_W} zIndex={2}>
              <ObserveSphere pressable scale={0.8} onClick={handleClick} />
            </Box>
            <MenuItem iconName="message-square" />
            <MenuItem avatar={profile?.picture} index={1} />
          </Row>

          {/* Safe area */}
          <Box safeAreaBottom />
        </Box>

        <ActionMenu isOpen={isDrawerOpen} onClose={handleClose} />
      </>
    );

  return (
    <>
      {/* Bottom Menu */}
      <Box style={styles.menu}>
        <Row justifyContent={"space-evenly"} zIndex={1}>
          <MenuItem iconName="life-buoy" index={0} route={state.routes[0]} />
          <MenuItem iconName="map" />
          <Box w={MENU_ITEM_W} zIndex={2}>
            <ObserveSphere pressable scale={0.8} onClick={handleClick} />
          </Box>
          <MenuItem
            iconName="message-square"
            index={1}
            route={state.routes[1]}
          />
          <MenuItem
            avatar={profile?.picture}
            index={2}
            route={state.routes[2]}
          />
        </Row>

        {/* Safe area */}
        <Box safeAreaBottom />
      </Box>

      <ActionMenu isOpen={isDrawerOpen} onClose={handleClose} />
    </>
  );
};
