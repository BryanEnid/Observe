import React from "react";
import { Box, Row, Text, Heading, Icon } from "native-base";
import { Experience, Education } from "./Experience";
import { Feather } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { useKeyboardDisplay } from "../../../hooks/useKeyboardDisplay";
import { SkillItem } from "./Skills/SkillItem";
import { SkillsActionMenu } from "./Skills/SkillsActionMenu";
import { useProfile } from "../../../hooks/useProfile";
import { useSkills } from "../../../hooks/useSkills";

const HEADERS_SIZE = "lg";
const HEADERS_EXTRA_BUTTON_SIZE = "sm";

export const ResumeScreen = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isKeyboardVisible } = useKeyboardDisplay();
  const { profile, updateProfile } = useProfile();
  const [skills, setSkills] = React.useState(null);
  const { getSkillsByRef } = useSkills();

  React.useEffect(() => {
    if (profile) {
      // Skills
      const data = getSkillsByRef(profile.skills);
      console.log("resume >>> data", data);
    }
  }, [profile]);

  const handleAddSkills = () => {
    setIsOpen(true);
  };

  const handleUpdateSkills = (data) => {
    // Closed by tapping out
    if (!data) return isKeyboardVisible ? Keyboard.dismiss() : setIsOpen(false);

    updateProfile({ skills: Object.keys(data) }, { isRef: true });
    return setIsOpen(false);
  };

  if (!skills) return <></>;

  return (
    <>
      <SkillsActionMenu isOpen={isOpen} onClose={handleUpdateSkills} />

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
              genuinely care about the environment. I am a graduate from Harvard
              & MIT.
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
            <Row flexWrap={"wrap"} space={2}>
              {[].map((text) => (
                <SkillItem key={text} logo="a">
                  <Text fontSize={11}>{text}</Text>
                </SkillItem>
              ))}

              <SkillItem
                onPress={handleAddSkills}
                key="plus"
                logo={
                  <Icon as={Feather} name="plus" size="4xl" color="blue.400" />
                }
              />
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
    </>
  );
};
