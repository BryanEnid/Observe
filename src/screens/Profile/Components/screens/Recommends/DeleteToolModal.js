import { Modal, Center, HStack, Button, Icon } from "native-base";

import { Ionicons } from "@expo/vector-icons";

export default function DeleteToolModal({
  deleteToolModalOpen,
  setDeleteToolModalOpen,
  toolForDeletion = {},
  handleDeleteTool,
}) {
  const { name = "", id = "" } = toolForDeletion;

  return (
    <Modal
      isOpen={deleteToolModalOpen}
      avoidKeyboard
      justifyContent="center"
      bottom="4"
      size="lg"
    >
      <Modal.Content>
        <Modal.CloseButton onPress={() => setDeleteToolModalOpen(false)} />
        <Modal.Header>Delete Tool confirmation</Modal.Header>
        <Modal.Body>
          {`¿Are you sure you want to delete ${name} from your recommends?`}
          <Center mt={5}></Center>
        </Modal.Body>
        <HStack space={"4"} justifyContent="center" paddingBottom={30}>
          <Button
            width={"40%"}
            leftIcon={
              <Icon as={Ionicons} name="arrow-back-circle-outline" size="sm" />
            }
            onPress={() => setDeleteToolModalOpen(false)}
          >
            Back
          </Button>

          <Button
            width={"40%"}
            leftIcon={<Icon as={Ionicons} name="trash-outline" size="sm" />}
            onPress={() => handleDeleteTool(id, setDeleteToolModalOpen)}
          >
            Delete
          </Button>
        </HStack>
      </Modal.Content>
    </Modal>
  );
}
