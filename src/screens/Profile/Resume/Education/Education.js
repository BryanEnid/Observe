import React from "react";
import { Box, Center, Column, Icon, Image, Row, Text } from "native-base";
import { ExperienceItem } from "../../../../components/ExperienceItem";
import { Feather } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useProfile } from "../../../../hooks/useProfile";
import { useKeyboardDisplay } from "../../../../hooks/useKeyboardDisplay";
import { EducationActionMenu } from "./EducationActionMenu";

const AddButton = ({ text, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Box
      variant="elevated"
      background="white"
      borderRadius={30}
      p={2}
      my={2}
      h={70}
    >
      <Center flex={1} flexDir="row">
        <Icon as={Feather} name="plus" size="4xl" color="blue.400" />
        <Text color="blue.400" fontWeight="bold">
          {text}
        </Text>
      </Center>
    </Box>
  </TouchableWithoutFeedback>
);

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

  if (!education) return <AddButton text="Add Education" />;

  return (
    <>
      <EducationActionMenu
        isOpen={isEducationOpen}
        onClose={handleUpdateEducation}
      />

      <Box>
        <Row>
          <Box flex={1}>
            <Box
              flex={1}
              borderRightWidth={1}
              right={3}
              borderColor={"blueGray.300"}
            />
          </Box>

          <Box flex={15}>
            {education.map(
              ({ title, companyName, fromYear, present, toYear, imageURI }) => (
                <ExperienceItem
                  // key={id}
                  title={title}
                  subheading={companyName}
                  // video={video}
                  from={fromYear}
                  to={present ? "Present" : toYear}
                  picture={imageURI}
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
