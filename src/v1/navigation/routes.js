import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../controllers/NavigationController';
import { Profile, ProfileVideo } from '../screens';
import { PortalProvider } from '../components/Portal/Portal';

const Stack = createStackNavigator();

const screenConfig = {
  headerShown: false,
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function Routes() {
  return (
    <PortalProvider>
      <NavigationContainer ref={navigationRef} theme={MyTheme} independent>
        <Stack.Navigator initialRouteName="Profile" screenOptions={screenConfig}>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ProfileVideo" component={ProfileVideo} />
        </Stack.Navigator>
      </NavigationContainer>
    </PortalProvider>
  );
}
