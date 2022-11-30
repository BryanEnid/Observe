import { useState } from "react";
import { Box, Pressable, Row, Text } from "native-base";

import DeleteToolModal from "./DeleteToolModal";

const ToolItem = ({
  children,
  toolId,
  setToolForDeletion,
  setDeleteToolModalOpen,
}) => {
  return (
    <Pressable
      onPressIn={() => setToolForDeletion(toolId)}
      onLongPress={() => {
        setDeleteToolModalOpen(true);
      }}
    >
      <Box
        variant="elevated"
        width={"100%"}
        mb={3}
        py={4}
        backgroundColor="white"
        borderRadius={30}
      >
        <Row>
          {<Text mx={"auto"}>{String(children)}</Text>}
          {/* <DeleteIcon /> */}
        </Row>
      </Box>
    </Pressable>
  );
};

const DeleteIcon = () => (
  <View
    style={{
      borderRadius: 50,
      borderWidth: 4,
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "red",
    }}
  >
    <View style={{ height: 4, width: 15, backgroundColor: "red" }}></View>
  </View>
);

export default function Category({ category, tools, handleDeleteTool }) {
  const [deleteToolModalOpen, setDeleteToolModalOpen] = useState(false);
  const [toolForDeletion, setToolForDeletion] = useState("");
  const renderTitle = !!tools.find((tool) => tool.category === category);

  const selectedTool = tools.find((tool) => tool.id === toolForDeletion);

  return (
    <>
      <DeleteToolModal
        toolForDeletion={selectedTool}
        deleteToolModalOpen={deleteToolModalOpen}
        setDeleteToolModalOpen={setDeleteToolModalOpen}
        handleDeleteTool={handleDeleteTool}
      />
      {renderTitle ? (
        <Box pt={3} pb={2}>
          <Text mx={"auto"}>{category}</Text>
        </Box>
      ) : null}
      {tools.map((tool) => {
        return tool.category === category ? (
          <ToolItem
            key={tool.id}
            toolId={tool.id}
            setToolForDeletion={setToolForDeletion}
            setDeleteToolModalOpen={setDeleteToolModalOpen}
          >
            {tool.name}
          </ToolItem>
        ) : null;
      })}
    </>
  );
}
