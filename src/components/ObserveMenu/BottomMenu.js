import React from "react";
import { Box, Icon, Row } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ObserveSphere } from "./ObserveSphere";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

// Constants
export const MENU_H = 60;
export const MENU_ITEM_W = "50px";

export const BottomMenu = ({ state, descriptors, navigation }) => {
  // Hooks
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

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
        <TouchableOpacity onPress={handleOnPress}>
          <Box
            w={MENU_ITEM_W}
            h={MENU_ITEM_W}
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            borderRadius={10}
          >
            <Icon
              as={Feather}
              name={props.iconName}
              size={isFocused ? "2xl" : "lg"}
              color={isFocused ? "#609ff7" : "gray.400"}
            />
          </Box>
        </TouchableOpacity>
      );
    },
    [state]
  );

  return (
    <>
      {/* Bottom Menu */}
      <Box style={styles.menu}>
        <Row justifyContent={"space-evenly"} zIndex={1}>
          <MenuItem iconName="life-buoy" index={0} route={state.routes[0]} />
          <MenuItem iconName="map" index={1} route={state.routes[1]} />
          <Box w={MENU_ITEM_W} zIndex={2}>
            <ObserveSphere pressable scale={0.8} />
          </Box>
          <MenuItem iconName="message-square" index={2} />
          <MenuItem iconName="anchor" index={3} />
        </Row>

        {/* Safe area */}
        <Box safeAreaBottom />
      </Box>
    </>
  );
};
