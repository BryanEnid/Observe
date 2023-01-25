import React from "react";
import {
  Box,
  Text,
  Icon,
  useDisclose,
  HStack,
  Button,
  VStack,
  Input,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Actionsheet } from "native-base";
import { Keyboard } from "react-native";
import { useKeyboardBottomInset } from "../../../../hooks/useKeyboardBottomInset";
import { SkillItem } from "./SkillItem";
import { useSkills } from "./useSkills";

export const SkillsActionMenu = ({ isOpen, onClose, currentSkills }) => {
  const Action = useDisclose();
  const { bottomInset } = useKeyboardBottomInset();
  const { getSkills } = useSkills();

  // State
  const [searchInput, setSearchInput] = React.useState("");
  const [skills, setSkills] = React.useState([]);
  const [isSearching, setSearching] = React.useState(false);
  const [selectedSkills, setSelectedSkills] = React.useState({});

  React.useEffect(() => {
    getSkills().then(setSkills).catch(console.error);
  }, []);

  React.useEffect(() => {
    if (bottomInset === 0) Keyboard.dismiss();
  }, [bottomInset]);

  React.useEffect(() => {
    isOpen && Action.onOpen();
  }, [isOpen]);

  const handleSelectedSkills = (skill) => {
    switch (skill.action) {
      case "add": {
        setSelectedSkills((prev) => ({ ...prev, [skill.id]: skill }));
        break;
      }

      case "remove": {
        setSelectedSkills((prev) => ({ ...prev, [skill.id]: null }));
        break;
      }
    }
  };

  const handleSubmit = () => {
    const removeAllFalsyValues = (a, [k, v]) => (v ? ((a[k] = v), a) : a);
    const entries = Object.entries(selectedSkills);
    const filteredSelectedSkills = entries.reduce(removeAllFalsyValues, {});

    // Save
    onClose(filteredSelectedSkills);
  };

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={onClose}
      onTouchStart={Keyboard.dismiss}
    >
      <Actionsheet.Content pt={4} bottom={bottomInset}>
        <HStack
          px={1}
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Button variant="link" w="80px" onPress={() => onClose()}>
            <Text color="primary.500" fontWeight="bold">
              Cancel
            </Text>
          </Button>
          <Text fontSize="md" bold w="80px" textAlign="center">
            Add Skill
          </Text>
          <Box w="80px" />
        </HStack>

        <VStack w="100%">
          <Box w="100%">
            <Input
              InputLeftElement={
                <Box px={2}>
                  <Icon as={Feather} name="search" />
                </Box>
              }
              type="text"
              w="100%"
            />
          </Box>

          <Box w="100%" h={215}>
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              contentInset={{ top: "12px" }}
            >
              {false && !!currentSkills.length && !isSearching && (
                <VStack w="100%" mb={5}>
                  <Text fontSize="md" fontWeight="bold" mb={2}>
                    Current:
                  </Text>
                  <HStack flexWrap={"wrap"} space={2} w="100%">
                    {["CSS3"].map((text) => (
                      <SkillItem
                        key={text}
                        id={text}
                        logo="a"
                        selectable
                        onPress={handleSelectedSkills}
                      >
                        <Text fontSize={11}>{text}</Text>
                      </SkillItem>
                    ))}
                  </HStack>
                </VStack>
              )}
              <VStack w="100%" mb={3}>
                <Text fontSize="md" fontWeight="bold" mb={2}>
                  Skills:
                </Text>
                <HStack flexWrap={"wrap"} space={2} w="100%">
                  {skills.map(({ name, id, logoUri }) => (
                    <SkillItem
                      key={id}
                      id={id}
                      logo={logoUri}
                      selectable
                      onPress={handleSelectedSkills}
                      isCurrent={currentSkills.includes(id)}
                    >
                      <Text fontSize={11}>{name}</Text>
                    </SkillItem>
                  ))}
                </HStack>
              </VStack>
            </ScrollView>
          </Box>
        </VStack>

        <Actionsheet.Item
          bg="primary.500"
          borderRadius={10}
          alignItems="center"
          onPress={handleSubmit}
          _pressed={{ bg: "primary.700" }}
        >
          <Text fontSize={"md"} fontWeight="bold" color="white">
            Done
          </Text>
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
