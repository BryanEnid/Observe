import { Center, Image, Button, Icon, HStack, Modal } from "native-base";

import useUpdatePicture from "../../hooks/useUpdatePicture";

import { Ionicons } from "@expo/vector-icons";

export default function MyModal({
  updatePicModalOpen,
  setUpdatePicModalOpen,
  profile,
  styles,
  userPicture,
  setPictureUrl,
  setIsloading,
}) {
  const { handleLaunchCamera, handlePickFromLibrary, handleDeletePicture } =
    useUpdatePicture();
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
              source={{ uri: userPicture }}
              fallbackSource={{
                uri: "https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg",
              }}
              style={styles.profile_picture}
              alt="profile picture"
            />
          </Center>
        </Modal.Body>
        <HStack space={"4"} justifyContent="center" paddingBottom={3}>
          <Button
            width={"40%"}
            leftIcon={
              <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
            }
            onPress={() =>
              handlePickFromLibrary(
                setPictureUrl,
                setUpdatePicModalOpen,
                setIsloading
              )
            }
          >
            Upload
          </Button>

          <Button
            width={"40%"}
            leftIcon={<Icon as={Ionicons} name="camera-outline" size="sm" />}
            onPress={() =>
              handleLaunchCamera(
                setPictureUrl,
                setUpdatePicModalOpen,
                setIsloading
              )
            }
          >
            Take
          </Button>
        </HStack>
        <HStack space={"4"} justifyContent="center" paddingBottom={30}>
          <Button
            width={"60%"}
            leftIcon={<Icon as={Ionicons} name="trash-outline" size="sm" />}
            onPress={() => {
              handleDeletePicture(setUpdatePicModalOpen, setIsloading);
            }}
          >
            Delete Picture
          </Button>
        </HStack>
      </Modal.Content>
    </Modal>
  );
}
