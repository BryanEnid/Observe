import { Center, Box, Text } from "native-base";
import React from "react";
import { TopMenu } from "./TopMenu";

export const Feed = () => {
  return (
    <Box flex={1}>
      <TopMenu />
      {/* <Text>Feed</Text> */}
    </Box>
  );
};
