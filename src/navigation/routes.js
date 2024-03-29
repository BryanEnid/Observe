import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useKeepAwake } from "expo-keep-awake";
import { useIsFetching } from "react-query";
import { Loading } from "../components/Loading";
import { BottomMenu } from "../components/ObserveMenu/BottomMenu";
import { Profile } from "../screens/Profile/Profile";
import { Feed } from "../screens/Feed/Feed";
import { SignIn } from "../screens/Authentication/SignIn";
import { SignUp } from "../screens/Authentication/SignUp";
import { Settings } from "../screens/Settings/Settings";
import { Immersive } from "../screens/Feed/Immersive";
import { AskQuestionScreen } from "../screens/Question/AskQuestion";
import { CaptureScreen } from "../screens/Capture/Capture";
import { useUser } from "../hooks/useUser";
import { QuestionPool } from "../screens/Question/QuestionPool";
import { useMetaTags } from "../hooks/useMetaTags";

// TODO: REMOVE
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

const HomeTabs = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName="Feed"
      screenOptions={screenConfig}
      tabBar={(props) => <BottomMenu {...props} />}
    >
      {/* By Index */}
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="QuestionPool" component={QuestionPool} />
      <Tab.Screen name="Profile" component={Profile} />

      {/* Extras */}
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default function Routes() {
  // Hooks
  useKeepAwake();
  const isFetching = useIsFetching();
  const { user, initialized } = useUser();

  if (!initialized) return <Loading />;

  return (
    <>
      <NavigationContainer linking={linking} independent>
        <Stack.Navigator screenOptions={screenConfig}>
          {!user ? (
            <Stack.Group>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Group>
          ) : (
            <>
              {/* Dashboard */}
              <Stack.Group>
                <Stack.Screen name="ContentFeed" component={HomeTabs} />
                <Stack.Screen name="Immersive" component={Immersive} />
              </Stack.Group>

              {/* Modals */}
              <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                  name="AskQuestion"
                  component={AskQuestionScreen}
                />
              </Stack.Group>

              {/* Capture Screen */}
              <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                <Stack.Screen name="CaptureScreen" component={CaptureScreen} />
                <Stack.Screen
                  name="CaptureScreen-Uploading"
                  component={CaptureScreen}
                />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>

      {!!isFetching && <Loading />}
    </>
  );
}
