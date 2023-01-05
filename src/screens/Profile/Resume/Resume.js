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
  const [currentSkillsRefs, setCurrentSkillRefs] = React.useState([]);
  const { getSkillsByRef } = useSkills();

  React.useEffect(() => {
    if (profile && !skills) {
      // Skills
      getSkillsByRef(profile.skills).then((data) => {
        let refs = [];
        data.forEach(({ id }) => refs.push(id));
        setSkills(data);
        setCurrentSkillRefs(refs);
      });
    }
  }, [profile, skills]);

  const handleAddSkills = () => {
    setIsOpen(true);
  };

  const handleUpdateSkills = (data) => {
    // Closed by tapping out
    if (!data) return isKeyboardVisible ? Keyboard.dismiss() : setIsOpen(false);
    updateProfile({ skills: Object.keys(data) }, { isRef: true });
    setSkills(Object.values(data));
    setCurrentSkillRefs(Object.keys(data));
    return setIsOpen(false);
  };

  if (!skills || !profile) return <></>;

  return (
    <>
      <SkillsActionMenu
        isOpen={isOpen}
        onClose={handleUpdateSkills}
        currentSkills={currentSkillsRefs}
      />

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
              {skills.map(({ name, logoUri, id }) => (
                <SkillItem key={id} logo={logoUri}>
                  <Text fontSize={11}>{name}</Text>
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
