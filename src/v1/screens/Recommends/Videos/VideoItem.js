import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { View, Text } from '../../../components';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
  },
  details: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  play_icon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default function VideoItem({ picture }) {
  return (
    <View style={styles.container} shadow>
      {/* Preview */}

      <View style={{ justifyContent: 'center' }}>
        <Image
          style={{ width: 130, height: 130, borderRadius: 20 }}
          source={{
            uri: picture.src.small,
          }}
        />

        <View style={styles.play_icon}>
          <Entypo name="controller-play" color="white" size={50} />
        </View>
      </View>

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.title}>
          <Text variant="h2" color="#727272" style={{ marginBottom: 5 }}>
            1. Gandhi the
          </Text>

          <Text variant="h2" color="#727272" style={{ marginBottom: 5 }}>
            42 min.
          </Text>
        </View>

        <Text color="#727272">
          Gandhi the Philosopher’s | 20 -Wise Quotes from the Goat Gandhi the Philosopher’s
        </Text>

        <Text variant="h2" color="#727272" style={{ marginTop: 5 }}>
          Posted 7 hours ago
        </Text>
      </View>
    </View>
  );
}
