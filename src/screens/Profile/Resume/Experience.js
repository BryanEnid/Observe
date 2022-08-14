import React from "react";
import { Box, Column, Icon, Image, Row, Text } from "native-base";
import {
  useExperienceDummyData,
  useEducationDummyData,
} from "./ResumeDummyData";
import { FontAwesome5 } from "@expo/vector-icons";

const ExperienceItem = ({
  title,
  subheading,
  video,
  from,
  to,
  picture = "",
}) => {
  const [collapsed] = React.useState(false);

  return (
    <Box variant="elevated" background="white" borderRadius={30} p={2} my={2}>
      <Box flexDir={"row"}>
        <Box flex={1} alignItems="center" mr={3}>
          <Box justifyContent="center" alignItems="center" h={70} w={70}>
            <Image
              borderRadius={20}
              src={picture}
              alt={`${subheading}-logo`}
              h={70}
              w={70}
              resizeMode="contain"
            />
          </Box>
        </Box>

        <Box flex={4}>
          <Row justifyContent={"space-between"}>
            <Box>
              <Text bold>{title}</Text>
              <Text>{subheading}</Text>
              <Text color={"blueGray.400"}>
                {from} - {to}
              </Text>
            </Box>

            <Box justifyContent={"center"} alignItems="center">
              <Image
                alt={`${subheading}-video`}
                src={video.video_picture}
                h={70}
                w={70}
                borderRadius={20}
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
  const Experience = useExperienceDummyData();

  if (!Experience) return <></>;

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
          {Experience.map(
            ({ title, company, video, from, to, present, id, logo }) => (
              <ExperienceItem
                key={id}
                title={title}
                subheading={company}
                video={video}
                from={from}
                to={present ? "Present" : to}
                picture={logo}
              />
            )
          )}
        </Box>
      </Row>
    </Box>
  );
};

export const Education = () => {
  const Education = useEducationDummyData();

  if (!Education) return <></>;

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
        </Box>
      </Row>
    </Box>
  );
};
