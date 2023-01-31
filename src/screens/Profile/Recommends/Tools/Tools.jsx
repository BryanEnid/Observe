import React from "react";
import {
  Box,
  Row,
  Heading,
  Text,
  Image,
  Column,
  IconButton,
  Icon,
  FlatList,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { AddButton } from "../../../../components/ExperienceAddButton";
import { useTools } from "./useTools";
import { ToolsActionMenu } from "./ToolsActionMenu";
import { Header } from "../../../../components/ProfileHeader";

const ToolItem = ({
  title,
  author,
  description,
  image,
  isEditMode,
  onDelete,
  id,
}) => {
  const handleDelete = () => {
    onDelete && onDelete(id);
  };

  return (
    <Box variant="elevated" bg="white" padding={3} borderRadius={20}>
      <Row alignItems="center" justifyContent={"space-between"}>
        <Row alignItems="center" space={2}>
          <Image source={{ uri: image }} w={10} h={10} resizeMode="contain" />
          <Text>{title}</Text>
        </Row>

        {isEditMode && (
          <IconButton
            onPress={handleDelete}
            icon={
              <Icon as={Feather} name="x-circle" size="lg" color="red.400" />
            }
          />
        )}
      </Row>
    </Box>
  );
};

export const Tools = ({ isEditMode, onEditMode: setEditMode }) => {
  // Hooks
  const { getToolsByProfileId, updateTools } = useTools();

  // State
  const [tools, setTools] = React.useState([]);
  const [isAMOpen, setAMOpen] = React.useState(false);

  React.useEffect(() => {
    getToolsByProfileId().then(({ tools }) => {
      return setTools(Object.entries(tools));
    });
  }, []);

  const handleAddBook = (payload) => {
    if (!payload) return setAMOpen(false);
    const newTool = Object.entries(payload);
    setTools((prev) => [...prev, ...newTool]);
    setAMOpen(false);
  };

  const handleDeleteBook = (id) => {
    const payload = Object.fromEntries(tools);
    delete payload[id];
    updateTools(payload);
    setTools(Object.entries(payload));
  };

  return (
    <Box>
      <Box m={2} />

      <ToolsActionMenu isOpen={isAMOpen} onClose={handleAddBook} />

      {(isEditMode || !!Object.values(tools).length) && (
        <Header title="Tools" onlyTitle />
      )}

      {isEditMode && (
        <Box mb={3} variant={"elevated"}>
          <AddButton text="Add tools" onPress={() => setAMOpen(true)} />
        </Box>
      )}

      <Column space={3}>
        {tools.map(([key, tool]) => (
          <ToolItem
            key={key}
            title={tool.title}
            author={tool.author}
            description={tool.description}
            image={tool.imageURI}
            isEditMode={isEditMode}
            onDelete={handleDeleteBook}
            id={key}
          />
        ))}
      </Column>
    </Box>
  );
};
