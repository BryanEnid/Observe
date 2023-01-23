import React from "react";
import { Box, Center, Heading, Icon, Image, Row, Text } from "native-base";
import { ExperienceItem } from "../../../../components/ExperienceItem";
import { Feather } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useProfile } from "../../../../hooks/useProfile";
import { useKeyboardDisplay } from "../../../../hooks/useKeyboardDisplay";
import { EducationActionMenu } from "./EducationActionMenu";
import { AddButton } from "../../../../components/ExperienceAddButton";

const FONT_HEADER_SIZE = "lg";

export const Education = ({ isEditMode }) => {
  // Hooks
  const { updateProfile, profile } = useProfile();
  const { isKeyboardVisible } = useKeyboardDisplay();

  // State
  const [isEducationOpen, setEducationIsOpen] = React.useState(false);
  const [education, setEducation] = React.useState([]);

  // Side Effects
  React.useEffect(() => {
    if (profile) {
      setEducation(profile.education ?? []);
    }
  }, [profile]);

  const handleUpdateEducation = (data) => {
    // If data includes target => it is an event, and it should be skipped.
    if (data?.target) return;

    // Closed by tapping out
    if (!data) {
      isKeyboardVisible ? Keyboard.dismiss() : setEducationIsOpen(false);
      return;
    }

    setEducationIsOpen(false);
    setEducation((prev) => [...prev, data]);
  };

  const handleAddEducation = () => setEducationIsOpen(true);

  const handleDeleteEducationItem = (id) => {
    const output = profile.experience.filter((item) => item.id !== id);
    setExperience(output);
    updateProfile({ experience: output });
  };

  if (!education) return <AddButton text="Add Education" />;

  return (
    <>
      <EducationActionMenu
        isOpen={isEducationOpen}
        onClose={handleUpdateEducation}
      />

      <Box>
        {(isEditMode || !!education.length) && (
          <Box px={4} py={2}>
            <Row justifyContent={"space-between"}>
              <Heading fontSize={FONT_HEADER_SIZE}>Education</Heading>
            </Row>
          </Box>
        )}

        <Row>
          <Box flex={1}>
            {education.length > 1 && (
              <Box
                flex={1}
                borderRightWidth={1}
                right={3}
                borderColor={"blueGray.300"}
                my={"50px"} // ! Fix this, soon cards will collapse
              />
            )}
          </Box>

          <Box flex={15}>
            {education.map(
              (
                { title, companyName, fromYear, present, toYear, imageURI, id },
                index
              ) => (
                <ExperienceItem
                  key={id}
                  id={id}
                  title={title}
                  subheading={companyName}
                  from={fromYear}
                  to={present ? "Present" : toYear}
                  picture={imageURI}
                  isEditMode={isEditMode}
                  onDelete={handleDeleteEducationItem}
                />
              )
            )}
            {isEditMode && (
              <AddButton onPress={handleAddEducation} text="Add Education" />
            )}
          </Box>
        </Row>
      </Box>
    </>
  );
};
