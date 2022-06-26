import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Text } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ConicalGradient from '../../components/ConicalGradient/ConicalGradient';

// import Navigation from '../../controllers/NavigationController';

const statusBarHeight = getStatusBarHeight();
const isAndroid = Platform.OS === 'android';

// Styles
const profileSize = { width: 180, height: 180, padding: 20 };

const styles = StyleSheet.create({
  profile_container: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: isAndroid ? statusBarHeight : null,
  },
  profile_item: { marginBottom: 10 },
  profile_picture: {
    width: profileSize.width - profileSize.padding,
    aspectRatio: 1,
    borderRadius: profileSize.width - profileSize.padding / 2,
  },
  profile_description: { textAlign: 'center', top: 10 },
});

export const Header = ({ data }) => {
  const { videoURI, profile, user } = data;

  // TODO: Add an action sheet

  return (
    <>
      <View style={styles.profile_container}>
        <TouchableOpacity>
          <View style={[{ height: profileSize.height }, styles.profile_item]}>
            <ConicalGradient>
              <Image source={{ uri: profile?.picture?.large }} style={styles.profile_picture} />
            </ConicalGradient>
          </View>
        </TouchableOpacity>

        <View>
          <Text fontSize="sm" style={styles.profile_description}>
            {`Software Engineer at Facebook\n"${user.quote}"`}
          </Text>
        </View>
      </View>
    </>
  );
};
