/* eslint-disable */
// https://medium.com/@linjunghsuan/implementing-a-collapsible-header-with-react-native-tab-view-24f15a685e07

import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from './Header';
import { useDummyData } from '../../hooks/useDummyData';

const HeaderHeight = 280;

const profileMock = {
  name: {
    first: 'Bryan',
    last: 'Tejada',
  },
  login: {
    username: 'BryanEnid',
  },
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  label: { fontSize: 16, color: '#222' },
  tab: { elevation: 0, shadowOpacity: 0, backgroundColor: 'white' },
  indicator: { backgroundColor: '#222' },
});

export const Profile = () => {
  const { getRandomUsers, getRandomVideos } = useDummyData();

  const [profile, setProfile] = useState();
  const [videoURI, setVideo] = useState();
  const [user] = useState({ quote: 'Seagulls are the eagles of the sea.' });

  // Fetching dummy data (Profile, and videos)
  useEffect(() => {
    getRandomUsers(1).then(({ results }) => setProfile(results[0]));

    const randomNumber = Math.round(Math.random() * 79);

    getRandomVideos().then(({ videos }) => setVideo(videos[randomNumber].video_files[0].link));
  }, []);

  //   if (profile && user && videoURI) return <></>;
  if (!profile && videoURI) return <></>;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Header data={{ profile, user, videoURI }} />
      </View>
    </View>
  );
};
