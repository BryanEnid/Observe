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
  Button,
  FlatList,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { AddButton } from "../../../../components/ExperienceAddButton";
import { useVideos } from "./useVideos";
import { VideosActionMenu } from "./VideosActionMenu";
import { Pressable } from "react-native";

const FONT_HEADER_SIZE = "lg";
const HEADERS_EXTRA_BUTTON_SIZE = "sm";

const Header = ({ title, onViewAll }) => {
  return (
    <Box px={4} py={2}>
      <Row justifyContent={"space-between"}>
        <Heading fontSize={FONT_HEADER_SIZE}>{title}</Heading>
        <Text fontSize={HEADERS_EXTRA_BUTTON_SIZE} color={"blue.400"}>
          View all
        </Text>
      </Row>
    </Box>
  );
};

const VideoItem = ({
  title,
  author,
  description,
  images,
  isEditMode,
  onDelete,
  onEdit,
  id,
}) => {
  const handleDelete = () => {
    onDelete && onDelete(id);
  };

  const handleEdit = () => {
    onEdit && onEdit(id);
  };

  return (
    <Pressable onPress={() => console.log("yay")}>
      <Column space={2} padding={1}>
        <Box alignItems="center" variant="elevated">
          {isEditMode && (
            <IconButton
              position="absolute"
              zIndex={3}
              onPress={handleDelete}
              borderRadius={30}
              bg="white"
              left={0}
              icon={
                <Icon as={Feather} name="x-circle" color="red.400" size="lg" />
              }
            />
          )}
          <Image
            alt="demo"
            borderRadius={30}
            w={"100%"}
            height={200}
            resizeMode="cover"
            source={{ uri: images[0].uri }}
          />
        </Box>

        {images.length > 1 && (
          <FlatList
            horizontal
            data={images}
            // keyExtractor={(item) => item.assetId}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                w={10}
                h={10}
                mx={1}
                alt="previews"
                borderRadius={3}
                resizeMode="cover"
                source={{ uri: item.uri }}
              />
            )}
          />
        )}

        <Box>
          <Text bold fontSize="12px">
            {title}
          </Text>
          <Text variant="caption" fontSize="12px">
            {author}
          </Text>
        </Box>

        <Box>
          <Text fontSize="12px">{description}</Text>
        </Box>
      </Column>
    </Pressable>
  );
};

export const Videos = ({ isEditMode, onEditMode: setEditMode }) => {
  // Hooks
  const { getBooksByProfileId, updateBooks } = useVideos();

  // State
  const [books, setBooks] = React.useState([]);
  const [leftColumn, setLeft] = React.useState([]);
  const [rightColumn, setRight] = React.useState([]);
  const [isAMOpen, setAMOpen] = React.useState(false);

  React.useEffect(() => {
    getBooksByProfileId().then(({ books }) => setBooks(books));
  }, []);

  React.useEffect(() => {
    if (books) {
      const entries = Object.entries(books).filter(([key, value]) => !!value);
      setLeft(entries.slice(entries.length / 2));
      setRight(entries.slice(0, entries.length / 2));
    }
  }, [books]);

  const handleAddBook = (payload) => {
    setBooks((prev) => ({ ...prev, ...payload }));
    setAMOpen(false);
  };

  const handleDeleteBook = (id) => {
    const payload = { ...books };
    delete payload[id];
    setBooks(payload);
    updateBooks(payload);
  };

  return (
    <Box>
      <Box m={2} />

      <VideosActionMenu isOpen={isAMOpen} onClose={handleAddBook} />

      {(isEditMode || !!Object.values(books).length) && (
        <Header title="Videos" />
      )}

      {isEditMode && (
        <Box mb={3} variant={"elevated"}>
          <AddButton text="Add video url" onPress={() => setAMOpen(true)} />
        </Box>
      )}

      <Box>
        <Row space={3}>
          {/* Left Column */}
          <Column flex={1} space={5}>
            {leftColumn.map(([key, book]) => (
              <VideoItem
                key={key}
                title={book?.title}
                author={book?.author}
                description={book?.description}
                images={book?.images}
                isEditMode={isEditMode}
                onDelete={handleDeleteBook}
                id={key}
              />
            ))}
          </Column>

          {/* Right Column */}
          <Column flex={1} space={5}>
            {rightColumn.map(([key, book]) => (
              <VideoItem
                key={key}
                title={book?.title}
                author={book?.author}
                description={book?.description}
                images={book?.images}
                isEditMode={isEditMode}
                onDelete={handleDeleteBook}
                id={key}
              />
            ))}
          </Column>
        </Row>
      </Box>
    </Box>
  );
};
