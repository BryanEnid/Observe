import React from "react";
import { Box, Row, Text, Heading, Icon, Button } from "native-base";
import { Experience } from "./Experience/Experience";
import { Education } from "./Education/Education";
import { Feather } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { useKeyboardDisplay } from "../../../hooks/useKeyboardDisplay";
import { SkillItem } from "./Skills/SkillItem";
import { SkillsActionMenu } from "./Skills/SkillsActionMenu";
import { useProfile } from "../../../hooks/useProfile";
import { useSkills } from "./Skills/useSkills";
import { useRoute } from "@react-navigation/native";

const HEADERS_SIZE = "lg";
const HEADERS_EXTRA_BUTTON_SIZE = "sm";

// TODO: Refactor this to reuse similar code
export const ResumeScreen = ({ isEditMode, onEditMode: setEditMode }) => {
  // Hooks
  const { isKeyboardVisible } = useKeyboardDisplay();
  const { profile, updateProfile } = useProfile();
  const { getSkillsByRef } = useSkills();
  const { params } = useRoute();

  // States
  const [skills, setSkills] = React.useState(null);
  const [currentSkillsRefs, setCurrentSkillRefs] = React.useState([]);

  // Modal Flags
  const [isSkillsOpen, setSkillsIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (profile && !skills) {
      // Skills
      getSkillsByRef(profile.skills ?? []).then((data) => {
        let refs = [];
        data.forEach(({ id }) => refs.push(id));
        setSkills(data);
        setCurrentSkillRefs(refs);
      });
    }
  }, [profile, skills]);

  const handleAddSkills = () => {
    setSkillsIsOpen(true);
  };

  const handleUpdateSkills = (data) => {
    // If data includes target => it is an event, and it should be skipped.
    if (data?.target) return;

    // Closed by tapping out
    if (!data) {
      isKeyboardVisible ? Keyboard.dismiss() : setSkillsIsOpen(false);
      return;
    }

    updateProfile({ skills: Object.keys(data) }, { isRef: true });
    setSkills(Object.values(data));
    setCurrentSkillRefs(Object.keys(data));
    return setSkillsIsOpen(false);
  };

  if (!skills || !profile) return <></>;

  return (
    <>
      {/* TODO: This can be a reusable component in which we can pass children UI */}
      <SkillsActionMenu
        isOpen={isSkillsOpen}
        onClose={handleUpdateSkills}
        currentSkills={currentSkillsRefs}
      />

      <Box mx={3}>
        {/* TODO: Hard coded text */}
        <Box m={2} />

        {isEditMode && (
          <Box m={2}>
            <Button bg="green.500" onPress={() => setEditMode(false)}>
              <Text fontSize={"15px"} color="white">
                Done editing
              </Text>
            </Button>
          </Box>
        )}
        {/* <Box pb={3}>
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
        </Box> */}

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

              {isEditMode && (
                <SkillItem
                  onPress={handleAddSkills}
                  key="plus"
                  logo={
                    <Icon
                      as={Feather}
                      name="plus"
                      size="4xl"
                      color="blue.400"
                    />
                  }
                />
              )}
            </Row>
          </Box>
        </Box>

        {/* Experience */}
        <Box pb={3}>
          <Experience isEditMode={isEditMode} />
        </Box>

        {/* Education */}
        <Box pb={3}>
          <Education isEditMode={isEditMode} />
        </Box>
      </Box>
    </>
  );
};
