/* eslint-disable camelcase */
import React from 'react';
import { Text, TextInput, LogBox } from 'react-native';
import {
  useFonts,
  Quicksand_700Bold,
  Quicksand_600SemiBold,
  Quicksand_500Medium,
  Quicksand_400Regular,
  Quicksand_300Light,
} from '@expo-google-fonts/quicksand';
import Routes from './src/navigation/routes';
import { PortalProvider } from './src/components';

import ProfileVideo from './src/screens/Profile/ProfileVideo';

// Disable unnecessary warnings
LogBox.ignoreLogs(['Require cycle:']);

//  Disable Font Scaling
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// Fonts
export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_700: Quicksand_700Bold,
    Quicksand_600: Quicksand_600SemiBold,
    Quicksand_500: Quicksand_500Medium,
    Quicksand_400: Quicksand_400Regular,
    Quicksand_300: Quicksand_300Light,
  });

  // TODO: Update this to use splash screen
  if (!fontsLoaded) return <></>;

  // return <ProfileVideo></ProfileVideo>;

  return (
    <PortalProvider>
      <Routes />
    </PortalProvider>
  );
}
