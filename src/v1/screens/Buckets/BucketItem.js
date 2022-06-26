import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Text, View } from '../../components';

const { width } = Dimensions.get('screen');
const gap = 20;

const styles = StyleSheet.create({
  bucket: {
    width: width / 3 - gap,
    height: width / 3 - gap + 20,
    margin: gap / 2,
    justifyContent: 'flex-end',
  },
  bucketImage: {
    width: width / 3 - gap,
    height: width / 3 - gap,
    borderRadius: width / 2,
    position: 'absolute',
    top: 0,
  },
  title: { textAlign: 'center' },
});

export default function BucketItem({ data }) {
  const video = React.useRef(null);
  const [, setStatus] = React.useState({});

  return (
    <View style={styles.bucket}>
      <Image style={styles.bucketImage} source={{ uri: data.video_pictures[0].picture }} />
      <Video
        ref={video}
        style={styles.bucketImage}
        isMuted
        shouldPlay
        source={{
          uri: data.video_files[data.video_files.length - 1].link,
        }}
        resizeMode="cover"
        isLooping
        onPlaybackStatusUpdate={(props) => setStatus(() => props)}
      />
      <Text variant="h2" style={styles.title}>
        {data.user.name.split(' ')[0]}
      </Text>
    </View>
  );
}
