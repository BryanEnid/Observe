import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../../../components';

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  skill: {
    fontSize: 11,
  },
});

export default function SoftSkillsCard({ items }) {
  return (
    <>
      {items.map((item) => (
        <View style={styles.card} key={item.skill} shadow>
          <Text style={styles.skill}>{item.skill}</Text>
        </View>
      ))}
    </>
  );
}
