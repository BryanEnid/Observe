import React from "react";
import { Box, Column, Row, Text } from "native-base";

export const Experience = () => {
  const ExperienceItem = () => {
    return (
      <Box variant="elevated" background="white" borderRadius={30} p={2}>
        <Row>
          <Column flex={1} justifyContent="center" alignItems="center">
            <Text>Logo</Text>
          </Column>

          <Row justifyContent={"space-between"} flex={3}>
            <Box>
              <Text bold>Harvard</Text>
              <Text>M.S. Computer Science</Text>
              <Text color="gray.400">1985 - 1990</Text>
            </Box>

            {/* Optional */}
            {/* <Box backgroundColor={"red.500"} h={70} w={70} borderRadius={20}>
              <Text>Video</Text>
            </Box> */}
          </Row>
        </Row>

        {/* Toggle */}
        <Row>
          <Column>
            <Text>Logo</Text>
          </Column>

          <Column>
            <Text>Content</Text>
          </Column>
        </Row>

        <Row justifyContent={"center"}>
          <Text color="blue.400">Close</Text>
        </Row>
      </Box>
    );
  };

  return (
    <Box>
      <Row>
        <Box flex={1}>
          <Text>Line</Text>
        </Box>

        <Box flex={9}>
          <ExperienceItem />
        </Box>
      </Row>
    </Box>
  );
};
