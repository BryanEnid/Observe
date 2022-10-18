import { Avatar, Box, FlatList, Text } from "native-base";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";

const MenuItem = ({ item, user }) => {
  const userConfig = {
    borderWidth: "4",
    borderColor: "#609ff7",
  };

  return (
    <Box mx={3} mt={3} justifyContent="center" alignItems="center">
      <Avatar
        source={{ uri: item.picture.medium }}
        size="lg"
        mb={1}
        {...(user && userConfig)}
      />
      <Text fontSize="11">{item.name.first}</Text>
    </Box>
  );
};

export const TopMenu = () => {
  const { width } = useWindowDimensions();
  const { data: profiles } = useRandomUsers({
    select: (data) => data.results,
    key: [{ amount: 30 }],
  });
  const { data: user } = useRandomUsers({
    select: ({ results }) => results[0],
    key: ["user", { amount: 1 }],
  });

  if (!profiles || !user) return <></>;

  return (
    <Box w={width} safeAreaTop justifyContent="center" alignItems="center">
      <FlatList
        ListHeaderComponent={<MenuItem item={user} user />}
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
