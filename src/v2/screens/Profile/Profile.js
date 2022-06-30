/* eslint-disable */
// https://medium.com/@linjunghsuan/implementing-a-collapsible-header-with-react-native-tab-view-24f15a685e07

// import ConicalGradient from '../../components/ConicalGradient/ConicalGradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useDummyData } from '../../hooks/useDummyData';
import { Text, Box, Pressable, VStack, Center, Image } from 'native-base';

const profileSize = { width: 180, height: 180, padding: 20 };

const styles = StyleSheet.create({
  profile_picture: {
    width: profileSize.width - profileSize.padding,
    aspectRatio: 1,
    borderRadius: profileSize.width - profileSize.padding / 2,
  },
});

export const Profile = () => {
  // Hooks
  const { getRandomUsers, getRandomVideos } = useDummyData();

  // State
  const [profile, setProfile] = React.useState();
  const [videoURI, setVideo] = React.useState();
  const [user] = React.useState({ quote: 'Seagulls are the eagles of the sea.' });

  // Life cycle
  React.useEffect(() => {
    // Fetching dummy data (Profile, and videos)
    getRandomUsers(1).then(({ results }) => setProfile(results[0]));
    const randomNumber = Math.round(Math.random() * 79);
    getRandomVideos().then(({ videos }) => setVideo(videos[randomNumber].video_files[0].link));
  }, []);

  if (!profile && !videoURI) return <></>;

  return (
    <>
      <Box alignItems={'center'} safeArea>
        {/* Profile */}
        <VStack space={5}>
          <Center>
            <Pressable onPress={() => {}}>
              <Box>
                <Image source={{ uri: profile?.picture?.large }} style={styles.profile_picture} />
              </Box>
            </Pressable>
          </Center>

          {/* Quotes */}

          <Center>
            <Text>Software Engineer at Facebook</Text>
            <Text>"{user.quote}"</Text>
          </Center>

          {/* User name text */}
          <Center>
            <Text bold>
              {profile.name.first} {profile.name.last}
            </Text>
            <Text>@{profile.login.username}</Text>
          </Center>

          {/* Divider */}
          <Center>
            <Box borderTopWidth={1} w={170} />
          </Center>
        </VStack>
      </Box>
    </>
  );
};
