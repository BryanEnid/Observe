import React from "react";
import { Box, Icon, Row } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ObserveSphere } from "./ObserveSphere";
import { Feather } from "@expo/vector-icons";

// Constants
export const MENU_H = 60;
export const MENU_ITEM_W = "50px";

export const BottomMenu = () => {
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
      zIndex: 0,
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
      <Icon as={Feather} name={props.iconName} size="lg" color="#609ff7" />
    </Box>
  );

  return (
    <>
      {/* Bottom Menu */}
      <Box style={styles.menu}>
        <Row justifyContent={"space-evenly"} zIndex={1}>
          <MenuItem iconName="life-buoy" />
          <MenuItem iconName="map" />
          <Box w={MENU_ITEM_W} zIndex={2}>
            <ObserveSphere pressable scale={0.8} />
          </Box>
          <MenuItem iconName="message-square" />
          <MenuItem iconName="anchor" />
        </Row>

        {/* Safe area */}
        <Box safeAreaBottom />
      </Box>
    </>
  );
};
