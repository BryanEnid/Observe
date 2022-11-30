import React, { useState } from "react";
import { Box } from "native-base";
import useTools from "../../../hooks/useTools";
import CreateToolModal from "./CreateToolModal";
import Category from "./Category";
import Header from "./Header";
import AddToolButton from "./AddToolButton";

export const RecommendsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    categories,
    tools,
    handleAddtool,
    newToolName,
    newToolCategory,
    setNewToolName,
    setNewToolCategory,
    handleDeleteTool,
  } = useTools({ setShowModal });

  return (
    <>
      <CreateToolModal
        showModal={showModal}
        setShowModal={setShowModal}
        categories={categories}
        newToolName={newToolName}
        newToolCategory={newToolCategory}
        setNewToolName={setNewToolName}
        setNewToolCategory={setNewToolCategory}
        handleAddtool={handleAddtool}
      />

      <Box mx={3}>
        <Header />
        {categories.map((category, index) => (
          <Category
            key={`${category}-${index}`}
            category={category}
            tools={tools}
            handleDeleteTool={handleDeleteTool}
          />
        ))}

        <AddToolButton setShowModal={setShowModal}>{"Add tool"}</AddToolButton>
      </Box>
    </>
  );
};
