import { Center, Image, Button, Icon, HStack, Modal } from "native-base";

import useUpdatePicture from "../../hooks/useUpdatePicture";

import { Ionicons } from "@expo/vector-icons";

export default function MyModal({
  updatePicModalOpen,
  setUpdatePicModalOpen,
  profile,
  styles,
}) {
  const { handleLaunchCamera, handlePickFromLibrary } = useUpdatePicture();
  return (
    <Modal
      isOpen={updatePicModalOpen}
      onClose={() => setUpdatePicModalOpen(false)}
      avoidKeyboard
      justifyContent="center"
      bottom="4"
      size="lg"
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Picture update</Modal.Header>
        <Modal.Body>
          ¿How do you want to update your picture?
          <Center mt={5}>
            <Image
              source={{ uri: profile?.picture?.large }}
              fallbackSource={{
                uri: "https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg",
              }}
              style={styles.profile_picture}
              alt="profile picture"
            />
          </Center>
        </Modal.Body>
        <HStack space={"4"} justifyContent="center" paddingBottom={30}>
          <Button
            width={"40%"}
            leftIcon={
              <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
            }
            onPress={() => handlePickFromLibrary()}
          >
            Upload
          </Button>

          <Button
            width={"40%"}
            leftIcon={<Icon as={Ionicons} name="camera-outline" size="sm" />}
            onPress={() => handleLaunchCamera()}
          >
            Take
          </Button>
        </HStack>
      </Modal.Content>
    </Modal>
  );
}
