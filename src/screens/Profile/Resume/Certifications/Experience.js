import React from "react";
import { Box, Row } from "native-base";
import { ExperienceActionMenu } from "./ExperienceActionMenu";
import { ExperienceItem } from "../../../../components/ExperienceItem";
import { Keyboard } from "react-native";
import { useProfile } from "../../../../hooks/useProfile";
import { useKeyboardDisplay } from "../../../../hooks/useKeyboardDisplay";
import { AddButton } from "../../../../components/ExperienceAddButton";
import reactotron from "reactotron-react-native";

export const Experience = ({ isEditMode }) => {
  // Hooks
  const { updateProfile, profile } = useProfile();
  const { isKeyboardVisible } = useKeyboardDisplay();

  // State
  const [isExperienceOpen, setExperienceIsOpen] = React.useState(false);
  const [experience, setExperience] = React.useState([]);

  React.useEffect(() => {
    if (profile) {
      setExperience(profile.experience ?? []);
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

  if (!experience) return <></>;

  return (
    <>
      <ExperienceActionMenu
        isOpen={isExperienceOpen}
        onClose={handleUpdateExperience}
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
            {experience.map(
              ({ title, companyName, fromYear, toYear, present, imageURI }) => (
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
              <AddButton onPress={handleAddExperience} text="Add Experience" />
            )}
          </Box>
        </Row>
      </Box>
    </>
  );
};
