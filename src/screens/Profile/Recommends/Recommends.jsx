import React from "react";
import { Box } from "native-base";

// Components
import { Books } from "./Books/Books";
import { Tools } from "./Tools/Tools";
import { Videos } from "./Videos/Videos";

// TODO: Refactor this to reuse similar code
export const RecommendsScreen = ({ isEditMode, onEditMode: setEditMode }) => {
  return (
    <>
      <Box mx={3}>
        <Books isEditMode={isEditMode} onEditMode={setEditMode} />

        <Tools isEditMode={isEditMode} onEditMode={setEditMode} />

        <Videos isEditMode={isEditMode} onEditMode={setEditMode} />
      </Box>
    </>
  );
};
