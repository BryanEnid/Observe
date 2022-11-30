import { Box, Text, Row, Heading } from "native-base";

const HEADERS_SIZE = "lg";
const HEADERS_EXTRA_BUTTON_SIZE = "sm";

export default function Header() {
  return (
    <Box px={4} py={2}>
      <Row justifyContent={"space-between"}>
        <Heading fontSize={HEADERS_SIZE}>Tools</Heading>
        <Text fontSize={HEADERS_EXTRA_BUTTON_SIZE} color={"blue.400"}>
          Edit
        </Text>
      </Row>
    </Box>
  );
}
