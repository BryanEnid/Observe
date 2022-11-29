import React, { useState } from "react";
import { Alert, Modal, View } from "react-native";
import { Box, Row, Text, Heading, Button, Input, Select } from "native-base";

const HEADERS_SIZE = "lg";
const HEADERS_EXTRA_BUTTON_SIZE = "sm";

const defaultCategories = [
  "Tech & Development",
  "Graphics",
  "3D Modeling and Rendering",
];

const selectedTools = [
  { id: "0", name: "Python", category: "Tech & Development" },
  { id: "1", name: "Java", category: "Tech & Development" },
  { id: "2", name: "Javascript", category: "Tech & Development" },
  { id: "3", name: "node.js", category: "Tech & Development" },
  { id: "4", name: "C++", category: "Tech & Development" },
  { id: "5", name: "Blender", category: "3D Modeling and Rendering" },
  { id: "6", name: "Substance Painter", category: "3D Modeling and Rendering" },
];

const Header = () => (
  <Box px={4} py={2}>
    <Row justifyContent={"space-between"}>
      <Heading fontSize={HEADERS_SIZE}>Tools</Heading>
      <Text fontSize={HEADERS_EXTRA_BUTTON_SIZE} color={"blue.400"}>
        Edit
      </Text>
    </Row>
  </Box>
);

const Category = ({ category, tools }) => {

  const renderTitle = !!tools.find((tool) => tool.category === category);

  return (
    <>
      {renderTitle ? (
        <Box pt={3} pb={2}>
          <Text mx={"auto"}>{category}</Text>
        </Box>
      ) : null}

        
      {tools.map((tool, index) => {
        return tool.category === category ? (
          <ToolItem key={`${tool.index}-${index}`}>{tool.name}</ToolItem>
        ) : null;

      })}
    </>
  );
};
const AddToolButton = ({ children, setShowModal }) => (
  <Box
    variant="elevated"
    width={"100%"}
    my={4}
    py={4}
    backgroundColor="white"
    borderRadius={30}
    onTouchStart={() => setShowModal(true)}
  >
    <Text color={"blue.400"} mx={"auto"}>
      {children}
    </Text>
  </Box>
);

const ToolItem = ({ children }) => {
    return (
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
    )
}




const modalBgStyle = (showModal) => {
  return {
    backgroundColor: "rgba(0,0,0,0.3)",
  };
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

const MyModal = ({
  showModal,
  setShowModal,
  categories,
  newToolName,
  setNewToolName,
  setNewToolCategory,
  newToolCategory,
  handleAddtool,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={showModal}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setShowModal(false);
    }}
  >
    <Box flex={1} style={modalBgStyle(showModal)}>
      <Box flex={5} onTouchStart={() => console.log("Johan")}></Box>
      <Box flex={3} py={6} px={4} background="white" borderTopRadius={30}>
        <Text mx={"auto"}>Add Tool</Text>
        <Input
          variant="filled"
          mt={5}
          value={newToolName}
          onChangeText={(text) => setNewToolName(text)}
          placeholder="Escriba su Herramienta"
        />
        <Select
          variant="filled"
          my={3}
          value={newToolCategory}
          selectedValue={newToolCategory}
          onValueChange={(itemValue) => setNewToolCategory(itemValue)}
        >
          {categories.map((category, index) => {
            return (
              <Select.Item
                key={`${category}-${index}-select-options`}
                label={category}
                value={category}
              />
            );
          })}
        </Select>

        <Button ml="auto" variant="link" onPress={() => handleAddtool()}>
          {"add"}
        </Button>
      </Box>
    </Box>
  </Modal>
);

export const RecommendsScreen = () => {
  const [categories, setCategories] = useState(defaultCategories);
  const [tools, setTools] = useState(selectedTools);
  const [showModal, setShowModal] = useState(false);
  const [newToolName, setNewToolName] = useState("");
  const [newToolCategory, setNewToolCategory] = useState("");

  const handleAddtool = () => {
    if (newToolName === "") {
      Alert.alert("You should add a tool");
      return;
    }

    if (newToolCategory === "") {
      Alert.alert("You should select a category");
      return;
    }
    const toolsCopy = [...tools];
    const newId = toolsCopy.length;
    toolsCopy.push({ id: newId, name: newToolName, category: newToolCategory });

    setTools(toolsCopy);
    Alert.alert("Tool added successfully");
    setNewToolName("");
    setNewToolCategory("");
    setShowModal(false);
  };

  return (
    <>
      <MyModal
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
          />
        ))}

        <AddToolButton setShowModal={setShowModal}>{"Add tool"}</AddToolButton>
      </Box>
    </>
  );
};
