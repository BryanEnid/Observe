/* eslint-disable */
// https://medium.com/@linjunghsuan/implementing-a-collapsible-header-with-react-native-tab-view-24f15a685e07

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Header from './Header';
import { TabView } from 'react-native-tab-view';
import RenderTabBar from './TabBar';
import TabBarElements from './TabBarElements';
import { profileMock } from './mocks';
import { DummyData } from '../../controllers';

const TabBarHeight = 30;
const TabBarHeightDetails = 70;
const HeaderHeight = 280;
const windowHeight = Dimensions.get('window').height;

const TabScene = ({
  children,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => {
  return (
    <Animated.ScrollView
      scrollToOverflowEnabled={true}
      ref={onGetRef}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={{
        paddingTop: HeaderHeight + TabBarHeight + TabBarHeightDetails,
        minHeight: windowHeight - TabBarHeight,
      }}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      })}
    >
      {children}
    </Animated.ScrollView>
  );
};

const CollapsibleTabView = () => {
  // -- STATE --
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState(TabBarElements);
  const [profile, setProfile] = useState(profileMock);
  const [videoURI, setVideo] = useState(null);
  const [user] = useState({ quote: 'Seagulls are the eagles of the sea.' });
  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  // -- LIFE CYCLES --

  // Setting current tab and scroll state
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  // Fetching dummy data (Profile, and videos)
  useEffect(() => {
    DummyData.getRandomUsers(1).then(({ results }) => setProfile(results[0]));
    const randomNumber = Math.round(Math.random() * 79);
    DummyData.getRandomVideos().then(({ videos }) => {
      console.log(videos[randomNumber].video_files[0]);
      setVideo(videos[randomNumber].video_files[0].link);
    });
  }, []);

  // -- ANIMATIONS --
  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollTo({ y: scrollY._value, animated: false });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (listOffset.current[item.key] < HeaderHeight || listOffset.current[item.key] == null) {
            if (item.value) {
              item.value.scrollTo({ y: HeaderHeight, animated: false });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  // -- COMPONENTS --
  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: 'clamp',
    });

    return (
      <Animated.View style={[styles.header, { transform: [{ translateY: y }] }]}>
        <Header data={{ profile, user, videoURI }} />
      </Animated.View>
    );
  };

  const renderScene = ({ route }) => {
    let children;
    for (let { key, screen: Component } of TabBarElements) {
      if (key === route.key) children = <Component />;
    }

    if (route.key === null) return null;

    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <TabScene
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          children={children}
          onGetRef={(ref) => {
            if (ref) {
              const found = listRefArr.current.find((e) => e.key === route.key);
              if (!found) {
                listRefArr.current.push({
                  key: route.key,
                  value: ref,
                });
              }
            }
          }}
        />
      </KeyboardAvoidingView>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onIndexChange={(index) => setIndex(index)}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => (
          <RenderTabBar
            {...props}
            config={{ HeaderHeight, TabBarHeight }}
            scrollY={scrollY}
            isListGliding={isListGliding}
            profile={profile}
          />
        )}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
    );
  };

  if (!videoURI) return <></>;

  return (
    <View style={{ flex: 1 }}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
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

export default CollapsibleTabView;
