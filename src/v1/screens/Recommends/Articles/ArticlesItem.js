import React from 'react';
import { Dimensions, StyleSheet, Image } from 'react-native';
import { View, Text } from '../../../components';

const { width } = Dimensions.get('screen');
const spacing = 30;
const cardWidth = width / 2 - spacing;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
  },
  image: {
    width: cardWidth,
    height: cardWidth / 1.3,
    borderRadius: 20,
    marginBottom: 10,
  },
  left: { marginRight: 10 },
  right: { marginLeft: 10, marginTop: 50 },
  title: { marginBottom: 10 },
  description: { marginBottom: 10 },
});

export default function ArticlesItem(props) {
  const { title, imgURI, readingTime, description, index } = props;
  const side = index % 2;

  return (
    <View style={[styles.card, !side ? styles.left : styles.right]}>
      <View style={styles.image} shadow>
        <Image style={styles.image} source={{ uri: imgURI }} />
      </View>

      <View style={styles.title}>
        <Text variant="h2">{title}</Text>
        <Text>Reading Time {readingTime}</Text>
      </View>
      <View>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View>
        <Text variant="button">Save</Text>
      </View>
    </View>
  );
}
