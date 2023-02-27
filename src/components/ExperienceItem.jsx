import React from "react";
import { Box, Icon, IconButton, Image, Row, Text, Button } from "native-base";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { AlertDialog } from "native-base";

export const ExperienceItem = ({
  title,
  subheading,
  video,
  from,
  to,
  picture = "",
  isEditMode,
  onDelete,
  id,
}) => {
  const [collapsed] = React.useState(false);
  const [isAlertVisible, setAlertVisible] = React.useState(false);
  const cancelRef = React.useRef();

  const handleOnCloseDialog = () => {
    setAlertVisible(false);
  };

  const handleDelete = () => {
    setAlertVisible(false);
    onDelete && onDelete(id);
  };

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isAlertVisible}
        onClose={handleOnCloseDialog}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Item</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to delete this item.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={handleOnCloseDialog}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={handleDelete}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <Box
        variant="elevated"
        background="white"
        borderRadius={30}
        p={2}
        my={2}
        w="100%"
      >
        <Box flexDir={"row"}>
          {picture ? (
            <Box flex={1} alignItems="center" mr={3}>
              <Box justifyContent="center" alignItems="center" h={70} w={70}>
                <Image
                  borderRadius={20}
                  src={picture}
                  alt={`${subheading}-logo`}
                  h={70}
                  w={70}
                  resizeMode="cover"
                />
              </Box>
            </Box>
          ) : (
            <Box
              flex={1}
              alignItems="center"
              mx={3}
              borderRadius={10}
              bgColor={"gray.300"}
            />
          )}

          <Box flex={4}>
            <Row justifyContent={"space-between"}>
              <Box>
                {title ? (
                  <Text bold>{title}</Text>
                ) : (
                  <Box
                    mt={1}
                    h={4}
                    w={100}
                    borderRadius={6}
                    bgColor={"gray.300"}
                  />
                )}
                {subheading ? (
                  <Text>{subheading}</Text>
                ) : (
                  <Box
                    mt={1}
                    h={4}
                    w={240}
                    borderRadius={6}
                    bgColor={"gray.300"}
                  />
                )}
                {from && to && (
                  <Text color={"blueGray.400"}>
                    {from} - {to}
                  </Text>
                )}
              </Box>

              {video && (
                <Box justifyContent={"center"} alignItems="center">
                  <Image
                    alt={`${subheading}-video`}
                    src={video.video_picture}
                    h={70}
                    w={70}
                    borderRadius={20}
                    resizeMode="cover"
                  />

                  <Icon
                    as={FontAwesome5}
                    name="play"
                    size="md"
                    color="white"
                    position="absolute"
                    top={"50%"}
                    left={"50%"}
                    style={{
                      width: 18,
                      height: 20,
                      transform: [{ translateX: -7 }, { translateY: -10 }],
                    }}
                  />
                </Box>
              )}
            </Row>

            {/* FIXME: To much text and font size is too big, it doesn't fix */}
            {collapsed && (
              <Box mt={5}>
                <Row justifyContent={"space-between"}>
                  <Text fontSize={11}>President of Computer Science Club </Text>
                  <Text fontSize={11}>Spring 1982</Text>
                </Row>
                <Row justifyContent={"space-between"}>
                  <Text fontSize={11}>Honors Society </Text>
                  <Text fontSize={11}>1980-1984</Text>
                </Row>
              </Box>
            )}
          </Box>
        </Box>
        {/* Close button */}
        {collapsed && (
          <Box justifyContent={"center"} alignItems="center" mt={2}>
            <Text color={"blue.400"}> Close</Text>
          </Box>
        )}
        {/* Bullet */}
        <Box
          w={3}
          h={3}
          backgroundColor={"blue.400"}
          borderRadius={6}
          borderWidth={3}
          borderColor={"blue.200"}
          position="absolute"
          top={"50%"}
          style={{ transform: [{ translateX: -19 }, { translateY: 2 }] }}
        />
        {isEditMode && (
          <IconButton
            onPress={() => setAlertVisible(true)}
            icon={
              <Icon as={Feather} name="x-circle" size="xl" color="red.400" />
            }
            w={3}
            h={3}
            position="absolute"
            top={"50%"}
            right={0}
            style={{ transform: [{ translateX: -20 }, { translateY: -1 }] }}
          />
        )}
      </Box>
    </>
  );
};
