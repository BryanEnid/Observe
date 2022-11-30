import React from "react";
import { Alert, Modal } from "react-native";
import { Box, Row, Text, Heading, Button, Input, Select } from "native-base";

const modalBgStyle = () => {
  return {
    backgroundColor: "rgba(0,0,0,0.3)",
  };
};

export default function CreateToolModal({
  showModal,
  setShowModal,
  categories,
  newToolName,
  setNewToolName,
  setNewToolCategory,
  newToolCategory,
  handleAddtool,
}) {
  return (
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
}
