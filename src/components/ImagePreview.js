import { Image, Modal, Box } from "native-base";
import { useWindowDimensions } from "react-native";

export const ImagePreview = ({ source, visible, onClose }) => {
  const { width } = useWindowDimensions();

  return (
    <Modal isOpen={visible} onClose={onClose} size="full">
      <Box width={width} height={width}>
        <Modal.CloseButton />
        {!!source?.uri.length && (
          <Image
            borderRadius={10}
            w="100%"
            h="100%"
            source={source}
            alt="preview"
            resizeMode="contain"
          />
        )}
      </Box>
    </Modal>
  );
};
