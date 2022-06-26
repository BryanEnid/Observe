import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Card } from '../../../../components/';

const { width } = Dimensions.get('screen');
const SPACING = 25;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width / 4 - SPACING,
    height: width / 4 - SPACING,
  },
});

const SkillsCard = ({ items }) => (
  <>
    {items.map((item) => (
      <Card key={item.skill.trim().toLowerCase()} style={styles.card}>
        <View style={styles.root}>
          {item.image}
          <Text style={styles.skill}>{item.skill}</Text>
        </View>
      </Card>
    ))}
  </>
);

export default SkillsCard;
