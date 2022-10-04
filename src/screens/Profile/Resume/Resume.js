import React from "react";
import { Box, Row, Text, Heading } from "native-base";
import { Experience, Education } from "./Experience";

const HEADERS_SIZE = "lg";
const HEADERS_EXTRA_BUTTON_SIZE = "sm";
const SKILLS = [
  "Javascript",
  "Leadership",
  "Marketing",
  "SEO",
  "Engineering",
  "React",
];

const SkillItem = ({ children }) => {
  return (
    <Box
      variant="elevated"
      mb={3}
      py={2}
      px={6}
      backgroundColor="white"
      borderRadius={30}
    >
      {children}
    </Box>
  );
};

export const ResumeScreen = () => {
  return (
    <Box mx={3}>
      <Box pb={3}>
        <Box px={4} py={2}>
          <Row justifyContent={"space-between"}>
            <Heading fontSize={HEADERS_SIZE}>About</Heading>

            <Text fontSize={HEADERS_EXTRA_BUTTON_SIZE} color={"blue.400"}>
              Values & Goals
            </Text>
          </Row>
        </Box>

        <Box p={4} background="white" borderRadius={30} variant="elevated">
          <Text lineHeight={17} color={"blueGray.400"} fontSize="sm">
            Hello, my name is Earl Livingston and I like seagulls. {"\n"}I
            genuinely care about the environment. I am a graduate from Harvard &
            MIT.
            {"\n\n"}
            www.earltheseagull.com
          </Text>
        </Box>
      </Box>

      <Box pb={3}>
        <Box px={4} py={2}>
          <Row justifyContent={"space-between"}>
            <Heading fontSize={HEADERS_SIZE}>Skills</Heading>

            <Text fontSize={HEADERS_EXTRA_BUTTON_SIZE} color={"blue.400"}>
              View all
            </Text>
          </Row>
        </Box>

        <Box>
          <Row flexWrap={"wrap"} space={3} justifyContent="center">
            {SKILLS.map((text) => (
              <SkillItem key={text}>{text}</SkillItem>
            ))}
          </Row>
        </Box>
      </Box>

      {/* Experience */}
      <Box pb={3}>
        <Box px={4} py={2}>
          <Row justifyContent={"space-between"}>
            <Heading fontSize={HEADERS_SIZE}>Experience</Heading>
          </Row>
        </Box>

        <Experience />
      </Box>

      {/* Education */}
      <Box pb={3}>
        <Box px={4} py={2}>
          <Row justifyContent={"space-between"}>
            <Heading fontSize={HEADERS_SIZE}>Education</Heading>
          </Row>
        </Box>

        <Education />
      </Box>
    </Box>
  );
};
