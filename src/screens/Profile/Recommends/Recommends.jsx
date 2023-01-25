import React from "react";
import { Keyboard } from "react-native";
import { Box, Row, Text, Heading, Icon, Button } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useKeyboardDisplay } from "../../../hooks/useKeyboardDisplay";
import { useProfile } from "../../../hooks/useProfile";
import { Books } from "./Books/Books";

// Components
// import { Experience } from "./Experience/Experience";
// import { Education } from "./Education/Education";

const HEADERS_SIZE = "lg";
const HEADERS_EXTRA_BUTTON_SIZE = "sm";

// TODO: Refactor this to reuse similar code
export const RecommendsScreen = ({ isEditMode, onEditMode: setEditMode }) => {
  // Hooks
  const { isKeyboardVisible } = useKeyboardDisplay();
  const { profile, updateProfile } = useProfile();

  return (
    <>
      <Box mx={3}>
        <Books isEditMode={isEditMode} onEditMode={setEditMode} />
      </Box>
    </>
  );
};
