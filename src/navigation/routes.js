import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useKeepAwake } from "expo-keep-awake";
import { useIsFetching } from "react-query";

import { Loading } from "../components/Loading";
import { BottomMenu } from "../components/ObserveMenu/BottomMenu";
import { useUser } from "../hooks/useUser";
import { Profile } from "../screens/Profile/Profile";
import { Feed } from "../screens/Feed/Feed";
import { SignIn } from "../screens/Authentication/SignIn";
import { SignUp } from "../screens/Authentication/SignUp";
import { Settings } from "../screens/Settings/Settings";

const linking = {
  prefixes: ["https://mychat.com", "mychat://"],
  config: {
    screens: {
      Profile: "profile",
    },
  },
};

// React Navigation Config
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenConfig = { headerShown: false };

export default function Routes() {
  // Hooks
  useKeepAwake();
  const isFetching = useIsFetching();
  const { user, initialized } = useUser();

  if (!initialized) return <Loading />;

  if (!user) {
    return (
      <NavigationContainer linking={linking} independent>
        <Stack.Navigator initialRouteName="SignIn" screenOptions={screenConfig}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <>
      <NavigationContainer linking={linking} independent>
        <Tab.Navigator
          backBehavior="history"
          initialRouteName="Feed"
          screenOptions={screenConfig}
          tabBar={(props) => <BottomMenu {...props} />}
        >
          <Tab.Screen name="Feed" component={Feed} />
          <Tab.Screen name="Profile" component={Profile} />

          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>

      {!!isFetching && <Loading />}
    </>
  );
}
