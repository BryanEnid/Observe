import React from "react";
import { Box, Row, Heading, Text } from "native-base";
import { ExperienceActionMenu } from "./ExperienceActionMenu";
import { ExperienceItem } from "../../../../components/ExperienceItem";
import { Keyboard } from "react-native";
import { useProfile } from "../../../../hooks/useProfile";
import { useKeyboardDisplay } from "../../../../hooks/useKeyboardDisplay";
import { AddButton } from "../../../../components/ExperienceAddButton";
import reactotron from "reactotron-react-native";

const FONT_HEADER_SIZE = "lg";

export const Experience = ({ isEditMode }) => {
  // Hooks
  const { updateProfile, profile } = useProfile();
  const { isKeyboardVisible } = useKeyboardDisplay();

  // State
  const [isExperienceOpen, setExperienceIsOpen] = React.useState(false);
  const [experience, setExperience] = React.useState([]);

  React.useEffect(() => {
    if (profile) {
      reactotron.log(profile.experience);
      setExperience(profile.experience ?? []);
      // setExperience([]);
    }
  }, [profile]);

  const handleUpdateExperience = (data) => {
    // If data includes target => it is an event, and it should be skipped.
    if (data?.target) return;

    // Closed by tapping out
    if (!data) {
      isKeyboardVisible ? Keyboard.dismiss() : setExperienceIsOpen(false);
      return;
    }

    setExperienceIsOpen(false);
    setExperience((prev) => [...prev, data]);
  };

  const handleAddExperience = () => setExperienceIsOpen(true);

  const handleDeleteExperienceItem = (id) => {
    const output = profile.experience.filter((item) => item.id !== id);
    setExperience(output);
    updateProfile({ experience: output });
  };

  if (!experience) return <></>;

  return (
    <>
      <ExperienceActionMenu
        isOpen={isExperienceOpen}
        onClose={handleUpdateExperience}
      />

      <Box>
        {(isEditMode || !!experience.length) && (
          <Box px={4} py={2}>
            <Row justifyContent={"space-between"}>
              <Heading fontSize={FONT_HEADER_SIZE}>Experience</Heading>
            </Row>
          </Box>
        )}

        <Row>
          <Box flex={1}>
            {experience.length > 1 && (
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
            {experience.map(
              ({
                title,
                companyName,
                fromYear,
                toYear,
                present,
                imageURI,
                id,
              }) => (
                <ExperienceItem
                  key={id}
                  id={id}
                  title={title}
                  subheading={companyName}
                  from={fromYear}
                  to={present ? "Present" : toYear}
                  picture={imageURI}
                  isEditMode={isEditMode}
                  onDelete={handleDeleteExperienceItem}
                  // video={video}
                />
              )
            )}
            {isEditMode && (
              <AddButton onPress={handleAddExperience} text="Add Experience" />
            )}
          </Box>
        </Row>
      </Box>
    </>
  );
};
