import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/Profile/Profile";
import { useKeepAwake } from "expo-keep-awake";
import { useIsFetching } from "react-query";
import { Loading } from "../components/Loading";
import { NavigationContainer } from "@react-navigation/native";

const linking = {
  prefixes: ["https://mychat.com", "mychat://"],
  config: {
    screens: {
      Profile: "profile",
    },
  },
};

const Stack = createStackNavigator();
const screenConfig = { headerShown: false };

export default function Routes() {
  // Hooks
  useKeepAwake();
  const isFetching = useIsFetching();

  return (
    <>
      <NavigationContainer
        linking={linking}
        independent
        // ref={navigationRef}
        // theme={MyTheme}
      >
        <Stack.Navigator
          initialRouteName="Profile"
          screenOptions={screenConfig}
        >
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>

      {!!isFetching && <Loading />}
    </>
  );
}
