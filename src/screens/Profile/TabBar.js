import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { View, Text, Divider } from '../../components';

const styles = StyleSheet.create({
  tab: { elevation: 0, shadowOpacity: 0, backgroundColor: 'white' },
  indicator: { backgroundColor: '#222' },
  profile_name: { textAlign: 'center' },
  profile_username: { textAlign: 'center' },
  stickyHeader: { backgroundColor: 'white', paddingTop: 10 },
  divider: { marginVertical: 10 },
});

export default function RenderTabBar(props) {
  const { config, scrollY, isListGliding, profile } = props;
  const { HeaderHeight, TabBarHeight } = config;

  const y = scrollY.interpolate({
    inputRange: [0, HeaderHeight - 40],
    outputRange: [HeaderHeight - 40, 0],
    extrapolateRight: 'clamp',
  });

  const renderLabel = ({ route, focused }) => (
    <Text style={{ opacity: focused ? 1 : 0.5 }}>{route.title}</Text>
  );

  return (
    <Animated.View
      style={{
        top: 0,
        borderTopWidth: TabBarHeight,
        borderColor: 'white',
        zIndex: 1,
        position: 'absolute',
        transform: [{ translateY: y }],
        width: '100%',
      }}
    >
      <View style={styles.stickyHeader}>
        <Text variant="h2" style={styles.profile_name}>
          {profile.name.first} {profile.name.last}
        </Text>
        <Text variant="button" style={styles.profile_username}>
          @{profile.login.username}
        </Text>

        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, styles.divider]}>
          <Divider style={styles.profile_item} />
        </View>
      </View>
      <TabBar
        {...props}
        // renderTabBarItem={renderLabel}
        onTabPress={({ preventDefault }) => isListGliding.current && preventDefault()}
        style={styles.tab}
        renderLabel={renderLabel}
        indicatorStyle={styles.indicator}
      />
    </Animated.View>
  );
}
