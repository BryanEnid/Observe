import { Box, Text } from "native-base";

export default function AddToolButton({ children, setShowModal }) {
  return (
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
}
