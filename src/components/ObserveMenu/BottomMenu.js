import React from "react";
import { Box, HStack } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ObserveSphere } from "./ObserveSphere";
import { Feather } from "@expo/vector-icons";

export const BottomMenu = () => {
  // Constants
  const MENU_H = 60;
  const MENU_ITEM_W = "50px";

  // Hooks
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    menu: {
      width,
      // height: MENU_HEIGHT + insets.bottom,
      position: "absolute",
      bottom: 0,
      backgroundColor: "white",
      shadowColor: "#333",
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.24,
      shadowRadius: 16.41,
      elevation: 20,
    },
  });

  const MenuItem = (props) => (
    <Box
      w={MENU_ITEM_W}
      h={MENU_ITEM_W}
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      borderRadius={10}
    >
      <Feather name={props.iconName} size={32} color="#609ff7" />
    </Box>
  );

  return (
    <Box style={styles.menu}>
      <HStack justifyContent={"space-evenly"}>
        <MenuItem iconName="life-buoy" />
        <MenuItem iconName="map" />
        <Box w={MENU_ITEM_W}>
          <ObserveSphere />
        </Box>
        <MenuItem iconName="message-square" />
        <MenuItem iconName="anchor" />
      </HStack>

      {/* Safe area */}
      <Box safeAreaBottom />
    </Box>
  );
};
