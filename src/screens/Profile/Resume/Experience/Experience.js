import React from "react";
import { Box, Center, Column, Icon, Image, Row, Text } from "native-base";
import { useEducationDummyData } from "../ResumeDummyData";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { ExperienceActionMenu } from "./ExperienceActionMenu";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useProfile } from "../../../../hooks/useProfile";
import { useKeyboardDisplay } from "../../../../hooks/useKeyboardDisplay";
import reactotron from "reactotron-react-native";

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

export const ExperienceItem = ({
  title,
  subheading,
  video,
  from,
  to,
  picture = "",
}) => {
  const [collapsed] = React.useState(false);

  return (
    <Box
      variant="elevated"
      background="white"
      borderRadius={30}
      p={2}
      my={2}
      w="100%"
    >
      <Box flexDir={"row"}>
        {picture ? (
          <Box flex={1} alignItems="center" mr={3}>
            <Box justifyContent="center" alignItems="center" h={70} w={70}>
              <Image
                borderRadius={20}
                src={picture}
                alt={`${subheading}-logo`}
                h={70}
                w={70}
                resizeMode="cover"
              />
            </Box>
          </Box>
        ) : (
          <Box
            flex={1}
            alignItems="center"
            mx={3}
            borderRadius={10}
            bgColor={"gray.300"}
          />
        )}

        <Box flex={4}>
          <Row justifyContent={"space-between"}>
            <Box>
              {title ? (
                <Text bold>{title}</Text>
              ) : (
                <Box
                  mt={1}
                  h={4}
                  w={100}
                  borderRadius={6}
                  bgColor={"gray.300"}
                />
              )}
              {subheading ? (
                <Text>{subheading}</Text>
              ) : (
                <Box
                  mt={1}
                  h={4}
                  w={240}
                  borderRadius={6}
                  bgColor={"gray.300"}
                />
              )}
              {from && to && (
                <Text color={"blueGray.400"}>
                  {from} - {to}
                </Text>
              )}
            </Box>

            {video && (
              <Box justifyContent={"center"} alignItems="center">
                <Image
                  alt={`${subheading}-video`}
                  src={video.video_picture}
                  h={70}
                  w={70}
                  borderRadius={20}
                  resizeMode="cover"
                />

                <Icon
                  as={FontAwesome5}
                  name="play"
                  size="md"
                  color="white"
                  position="absolute"
                  top={"50%"}
                  left={"50%"}
                  style={{
                    width: 18,
                    height: 20,
                    transform: [{ translateX: -7 }, { translateY: -10 }],
                  }}
                />
              </Box>
            )}
          </Row>

          {/* FIXME: To much text and font size is too big, it doesn't fix */}
          {collapsed && (
            <Box mt={5}>
              <Row justifyContent={"space-between"}>
                <Text fontSize={11}>President of Computer Science Club </Text>
                <Text fontSize={11}>Spring 1982</Text>
              </Row>
              <Row justifyContent={"space-between"}>
                <Text fontSize={11}>Honors Society </Text>
                <Text fontSize={11}>1980-1984</Text>
              </Row>
            </Box>
          )}
        </Box>
      </Box>

      {/* Close button */}
      {collapsed && (
        <Box justifyContent={"center"} alignItems="center" mt={2}>
          <Text color={"blue.400"}> Close</Text>
        </Box>
      )}

      {/* Bullet */}
      <Box
        w={3}
        h={3}
        backgroundColor={"blue.400"}
        borderRadius={6}
        borderWidth={3}
        borderColor={"blue.200"}
        position="absolute"
        top={"50%"}
        style={{ transform: [{ translateX: -19 }, { translateY: 2 }] }}
      />
    </Box>
  );
};

export const Experience = () => {
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

    // updateProfile({ experience: Object.keys(data) }, { isRef: true });
    // setExperience(Object.values(data));
    // return setExperienceIsOpen(false);
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
            <AddButton onPress={handleAddExperience} text="Add Experience" />
          </Box>
        </Row>
      </Box>
    </>
  );
};

export const Education = () => {
  const Education = [];

  if (!Education) return <AddButton text="Add Experience" />;

  return (
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
          {Education.map(
            ({ title, degree, video, from, to, present, id, logo }) => (
              <ExperienceItem
                key={id}
                title={title}
                subheading={degree}
                video={video}
                from={from}
                to={present ? "Present" : to}
                picture={logo}
              />
            )
          )}
          <AddButton text="Add Education" />
        </Box>
      </Row>
    </Box>
  );
};
