import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View } from '../../components';
import { DummyData } from '../../controllers';
import BucketItem from './BucketItem';

const { width } = Dimensions.get('screen');
const gap = 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 30,
  },
  bucketImage: {
    width: width / 3 - gap,
    height: width / 3 - gap,
    margin: gap / 2,
    borderRadius: width / 2,
  },
});

export default function Buckets() {
  const [buckets, setBuckets] = React.useState();

  React.useEffect(() => {
    DummyData.getRandomVideos({ per_page: 17 })
      .then((data) => setBuckets(data))
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      {buckets && buckets.videos.map((data) => <BucketItem data={data} key={data.id} />)}
    </View>
  );
}
