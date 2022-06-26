import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../screens/Profile/Profile';
import { useKeepAwake } from 'expo-keep-awake';
import { NativeBaseProvider, extendTheme } from 'native-base';
// import { navigationRef } from '../controllers/NavigationController';

const Stack = createStackNavigator();

const screenConfig = {
  headerShown: false,
};

const theme_config = {};

const config = {
  // rest of the config keys like dependencies can go here
  strictMode: 'warn',
};

export default function Routes() {
  // Hooks
  useKeepAwake();

  const theme = extendTheme();

  return (
    <NativeBaseProvider config={config} theme={theme}>
      {/* <NavigationContainer ref={navigationRef} theme={MyTheme}> */}
      <Stack.Navigator initialRouteName="root" screenOptions={screenConfig} independent>
        <Stack.Screen name="root" component={Profile} />
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </NativeBaseProvider>
  );
}
