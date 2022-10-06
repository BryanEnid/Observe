import { Text } from "native-base";
import React from "react";

export const Settings = () => {
  React.useEffect(() => {
    toggleBottomMenu();
  }, []);

  return <Text>Settings</Text>;
};
