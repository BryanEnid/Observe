import React, { useRef } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: { flex: 1 },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    height,
    width,
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ProfileVideo({ route }) {
  const { uri } = route.params;
  const video = useRef(null);
  const [isLoading, setLoading] = React.useState(true);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loading}>
          <Text style={{ color: 'white' }}>Loading...</Text>
        </View>
      )}
      <Video
        ref={video}
        style={styles.video}
        source={{ uri }}
        resizeMode={ResizeMode.COVER}
        onLoad={() => setLoading(false)}
        isLooping
        onLayout={() => video.current.playAsync()}
        volume={100}
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
}
