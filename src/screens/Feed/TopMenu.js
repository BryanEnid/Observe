import { Avatar, Box, FlatList, Text } from "native-base";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";

const MenuItem = ({ item }) => {
  return (
    <Box mx={4} my={3}>
      <Avatar source={{ uri: item.picture.medium }} size="lg" />
    </Box>
  );
};

export const TopMenu = () => {
  const { width } = useWindowDimensions();
  const { data: profiles } = useRandomUsers({
    select: (data) => data.results,
    key: [{ amount: 30 }],
  });

  const styles = StyleSheet.create({
    TopBar: {
      position: "absolute",
      top: 0,
    },
  });

  if (!profiles) return <></>;

  return (
    <Box
      style={styles.TopBar}
      w={width}
      safeAreaTop
      justifyContent="center"
      alignItems="center"
    >
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        snapToInterval={1}
        decelerationRate="fast"
        style
        horizontal
        flexDir="row"
        data={profiles}
        renderItem={MenuItem}
        keyExtractor={(item) => item.login.uuid}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};
