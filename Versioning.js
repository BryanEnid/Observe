/* eslint-disable camelcase */
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer, DefaultTheme, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../controllers/NavigationController';
import RoutesV1 from './src/v1/navigation/routes';
import RoutesV2 from './src/v2/navigation/routes';

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export const Versioning = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <Button
        title="Observe V1"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'v1' }] })}
      />
      <Button
        title="Observe V2"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'v2' }] })}
      />
    </View>
  );
};

export const Routes = () => {
  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <Stack.Navigator initialRouteName="Versioning" screenOptions={screenConfig}>
        <Stack.Screen name="Versioning" component={Versioning} />

        <Stack.Screen name="v1" component={RoutesV1} />
        <Stack.Screen name="v2" component={RoutesV2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
