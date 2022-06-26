import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../../../components';
import { DummyData } from '../../../controllers';
import VideoItem from './VideoItem';

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default function Videos() {
  // FAKE DATA
  const [pictures, setPictures] = React.useState();

  React.useEffect(() => {
    DummyData.getRandomPictures()
      .then(({ photos }) => setPictures(photos))
      .catch(console.error);
  }, []);

  return (
    <>
      <View style={{ padding: 20 }}>
        <View style={styles.title}>
          <Text variant="h1">Videos</Text>
          <Text variant="button" style={{ fontSize: 15, marginLeft: 10 }}>
            View all
          </Text>
        </View>

        {pictures?.map((picture, index) => (
          <View style={{ marginVertical: 10 }} key={`${picture.id}${index}`}>
            <VideoItem picture={picture} />
          </View>
        ))}
      </View>
    </>
  );
}
