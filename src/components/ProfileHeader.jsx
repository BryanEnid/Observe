import React from "react";
import { Box, Row, Heading, Text } from "native-base";

const FONT_HEADER_SIZE = "lg";
const HEADERS_EXTRA_BUTTON_SIZE = "sm";

export const Header = ({ title, onViewAll, onlyTitle }) => {
  return (
    <Box px={4} py={2}>
      <Row justifyContent={"space-between"}>
        <Heading fontSize={FONT_HEADER_SIZE}>{title}</Heading>
        {!onlyTitle && (
          <Text fontSize={HEADERS_EXTRA_BUTTON_SIZE} color={"blue.400"}>
            View all
          </Text>
        )}
      </Row>
    </Box>
  );
};
