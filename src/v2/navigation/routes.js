import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../controllers/NavigationController';
import { Profile, ProfileVideo } from '../screens';

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
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <Stack.Navigator initialRouteName="root" screenOptions={screenConfig}>
        <Stack.Screen
          name="root"
          component={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>New version!</Text>
            </View>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
