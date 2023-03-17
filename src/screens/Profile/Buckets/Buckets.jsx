import React from "react";
import { Row, Button, Center, Box, Text, Image } from "native-base";

import { BooksActionMenu } from "./BucketsActionMenu";

import { BucketAddButton, BucketItem } from "./BucketItem";
import { useRandomVideos } from "../../../hooks/query/useRandomVideos";
import { useRandomUsers } from "../../../hooks/query/useRandomUsers";
import { useBuckets } from "./useBuckets";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationBar } from "../../../components/NavigationBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export const BucketScreen = ({ isEditMode, onEditMode: setEditMode }) => {
  // Hooks

  const { getBucketsByProfileId } = useBuckets();

  // State
  const [isModalVisible, setShowModal] = React.useState(false);
  const [buckets, setBuckets] = React.useState();

  // Effects
  React.useEffect(() => {
    getBucketsByProfileId().then((data) => setBuckets(Object.entries(data)));
  }, [isModalVisible]);

  // const amount = 14;
  // const { data: videos } = useRandomVideos({
  //   key: [{ per_page: amount, size: "small" }],
  //   select: (res) => res.videos,
  // });

  // const { data: profile } = useRandomUsers({ key: [{ amount }] });

  // if (!videos || !profile) return <></>;

  // Callbacks
  const handleAddBucket = () => {
    setShowModal(true);
  };

  const handleBucketClose = () => {
    setShowModal(false);
  };

  return (
    <Row flexWrap={"wrap"}>
      {/* Modal */}
      <BooksActionMenu isOpen={isModalVisible} onClose={handleBucketClose} />

      {buckets &&
        buckets.map(([name, data], index) => (
          <BucketItem data={{ ...data, name }} key={data.id} />
        ))}

      <BucketAddButton onPress={handleAddBucket} />
    </Row>
  );
};

export const BucketListScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const handlePreview = (item) => {
    navigation.navigate("Preview", item);
  };

  return (
    <Box flex={1} safeAreaTop>
      <NavigationBar
        color="primary.600"
        title={<Text bold>{params.name}</Text>}
      />

      <FlatList
        data={params.videos}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePreview(item)}>
            <Image
              borderRadius={9}
              mx={1}
              source={{ uri: item.details.thumbnail }}
              w={120}
              h={120}
            />
          </Pressable>
        )}
        horizontal
      />
    </Box>
  );
};
