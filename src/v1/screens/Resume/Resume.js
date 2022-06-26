import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  Card,
  SkillsCard,
  SoftSkillsCard,
  ExperienceCard,
  Certification,
  Achievement,
} from "../../components";
import { BIO_MOCK_DATA } from "../../components/Card/MockContent";
import {
  ACHIEVEMENTS_CONFIG,
  CERTIFICATIONS_CONFIG,
  MOCK_EXPERIENCE_CONFIG,
  SKILLS_CONFIG,
} from "../../components/config/config.model";
import SoftSkillsConfig from "./components/SoftSkillsCard/SoftSkills.json";

const styles = StyleSheet.create({
  resumeContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  skillSection: {
    marginVertical: 25,
  },
  titleSection: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plainCard: {
    marginBottom: 20,
  },
  skillsCardsContainer: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hiddenSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  experience_title_section: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  experience_section_line: {
    position: "absolute",
    alignSelf: "center",
    width: 1,
    height: "100%",
    backgroundColor: "#999",
  },
  lineBreak: {
    marginBottom: 5,
  },
  expand_button: {
    textAlign: "center",
    marginTop: 10,
  },
  blue_point_container: {
    borderRadius: 50,
    backgroundColor: "#C5E4FF",
    height: 13,
    width: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  blue_point: {
    borderRadius: 5,
    backgroundColor: "#1CB9FE",
    height: 8,
    width: 8,
  },
  blue_point_separator: {
    borderRadius: 50,
    backgroundColor: "white",
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  certification_section: {
    marginTop: 30,
    marginBottom: 20,
  },
  achievements_section: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default function Resume() {
  return (
    <View style={styles.resumeContainer}>
      {/* ABOUT SECTION */}
      <View name="About Section">
        {/* Title */}
        <View style={styles.titleSection}>
          <Text variant="h1">About</Text>
          <Text variant="button">Values & Goals</Text>
        </View>

        {/* TEXT */}
        <Card style={{ paddingTop: 30 }}>
          <Text style={styles.lineBreak} color="#4A4A4A">
            {BIO_MOCK_DATA.lineOne} {"\n\n"} {BIO_MOCK_DATA.lineTwo} {"\n\n"}
            {BIO_MOCK_DATA.landingLink}
          </Text>
          <Text style={styles.expand_button} variant="button">
            Expand
          </Text>
        </Card>
      </View>

      {/* SKILL SECTION */}
      <View style={styles.skillSection}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text variant="h1">Skills</Text>
          <Text variant="button">View all</Text>
        </View>

        <View style={styles.skillsCardsContainer}>
          <SkillsCard items={SKILLS_CONFIG} />
        </View>
        <View style={styles.skillsCardsContainer}>
          <SoftSkillsCard items={SoftSkillsConfig} />
        </View>
        <View style={styles.hiddenSection}>
          <TouchableOpacity>
            <MaterialIcons name="keyboard-arrow-down" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* EXPERIENCE SECTION */}
      <View>
        {/* TITLE */}
        <View style={styles.experience_title_section}>
          <Text variant="h1">Experience</Text>
          <Text style={styles.moreDetailsLink} variant="button">
            View all
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          {/* LEFT COLUMN (LINE) */}
          <View
            style={{ flex: 1, paddingTop: "30%", justifyContent: "center" }}
          >
            <View style={styles.experience_section_line} />
          </View>

          {/* RIGHT COLUMN DETAILS */}
          <View style={{ flex: 8 }}>
            {MOCK_EXPERIENCE_CONFIG.map((item, index) => {
              const isNotWrapper = (i) => {
                if (i === 0 || i === MOCK_EXPERIENCE_CONFIG.length - 1)
                  return false;
                return true;
              };

              const [showExperienceDetails, setShowExperienceDetails] =
                useState(false);
              return (
                <TouchableWithoutFeedback
                  onPress={() => setShowExperienceDetails(true)}
                  key={item.title.trim().toLowerCase()}
                >
                  <View style={{ flex: 1 }}>
                    <ExperienceCard
                      showDetail={showExperienceDetails}
                      setShowDetail={setShowExperienceDetails}
                      experience={item}
                      index={index}
                      cardStyle={isNotWrapper(index) && { marginVertical: 10 }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
      </View>

      {/* Certifications Section */}
      <View name="Certifications Section">
        <View style={styles.certification_section}>
          <Text variant="h1">Certification</Text>
        </View>
        {CERTIFICATIONS_CONFIG.map((item, index) => (
          <Certification key={Number(index)} item={item} />
        ))}
      </View>

      {/* Achievements Section */}

      <View name="Achievements Section">
        <View style={styles.achievements_section}>
          <Text variant="h1">Achievements</Text>
        </View>
        {ACHIEVEMENTS_CONFIG.map((item, index) => (
          <Achievement key={Number(index)} item={item} />
        ))}
      </View>
    </View>
  );
}

export function ResumeBottomMenu() {
  return <Text>Resume Bottom Menu</Text>;
}
