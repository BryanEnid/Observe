import React from "react";
import { Box, Icon, Pressable, Row, Text } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import { ObserveSphere } from "./ObserveSphere";
import { Feather } from "@expo/vector-icons";
import { Avatar } from "native-base";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";
import { Actionsheet } from "native-base";

// Constants
export const MENU_H = 60;
export const MENU_ITEM_W = "50px";

const ActionMenu = ({ isOpen, onClose }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: "gray.300",
            }}
          >
            Albums
          </Text>
        </Box>
        <Actionsheet.Item>Delete</Actionsheet.Item>
        <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
        <Actionsheet.Item>Play</Actionsheet.Item>
        <Actionsheet.Item>Favourite</Actionsheet.Item>
        <Actionsheet.Item>Cancel</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export const BottomMenu = ({ state, descriptors, navigation }) => {
  // Hooks
  const { width } = useWindowDimensions();
  const { data: profile } = useRandomUsers({
    select: ({ results }) => results[0],
  });

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const styles = StyleSheet.create({
    menu: {
      width,
      // height: MENU_HEIGHT + insets.bottom,
      // position: "absolute",
      // bottom: 0,
      backgroundColor: "white",
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
      const isFocused = state.index === props.index;

      const handleOnPress = () => {
        if (!props.route) return null;

        const event = navigation.emit({
          type: "tabPress",
          target: props.route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          // The `merge: true` option makes sure that the params inside the tab screen are preserved
          navigation.navigate({ name: props.route.name, merge: true });
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
                <Avatar
                  bg="green.500"
                  size="sm"
                  source={{ uri: profile?.picture?.medium }}
                />
              </Box>
            )}
          </Box>
        </Pressable>
      );
    },
    [state, profile]
  );

  const handleClick = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    console.log("triggered");
    setDrawerOpen(false);
  };

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
          <MenuItem iconName="message-square" index={2} />
          <MenuItem avatar index={1} route={state.routes[1]} />
        </Row>

        {/* Safe area */}
        <Box safeAreaBottom />
      </Box>

      <ActionMenu isOpen={isDrawerOpen} onClose={handleClose} />
    </>
  );
};
