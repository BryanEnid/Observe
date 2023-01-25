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
  images,
  isEditMode,
  onDelete,
  id,
}) => {
  const handleDelete = () => {
    onDelete && onDelete(id);
  };

  return (
    <Box variant="elevated" bg="white" padding={3} borderRadius={20}>
      {title}
    </Box>
  );
};

export const Tools = ({ isEditMode, onEditMode: setEditMode }) => {
  // Hooks
  const { getBooksByProfileId, updateBooks } = useTools();

  // State
  const [tools, setTools] = React.useState([]);
  const [isAMOpen, setAMOpen] = React.useState(false);

  React.useEffect(() => {
    getBooksByProfileId().then(({ books }) => setTools(Object.entries(books)));
  }, []);

  const handleAddBook = (payload) => {
    setTools((prev) => ({ ...prev, ...payload }));
    setAMOpen(false);
  };

  const handleDeleteBook = (id) => {
    const payload = { ...tools };
    delete payload[id];
    setTools(payload);
    updateBooks(payload);
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
          <AddButton text="Add book" onPress={() => setAMOpen(true)} />
        </Box>
      )}

      <Column space={3}>
        {tools.map(([key, tool]) => (
          <ToolItem
            key={key}
            title={tool.title}
            author={tool.author}
            description={tool.description}
            images={tool.images}
            isEditMode={isEditMode}
            onDelete={handleDeleteBook}
            id={key}
          />
        ))}
      </Column>
    </Box>
  );
};
