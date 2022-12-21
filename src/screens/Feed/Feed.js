import { Box, ScrollView } from "native-base";
import React from "react";
import { Question } from "./Posts/Question";
import { TopMenu } from "./TopMenu";
import { usePosts } from "../../hooks/usePosts";
import { RefreshControl } from "react-native";
import { useRoute } from "@react-navigation/native";

export const Feed = () => {
  const { getPosts } = usePosts();
  const { params } = useRoute();

  const [questions, setQuestions] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleFetch();
  }, []);

  const handleFetch = () => {
    return getPosts().then((data) => {
      setQuestions(data);
      setRefreshing(false);
    });
  };

  React.useEffect(() => {
    handleFetch();
  }, []);

  React.useEffect(() => {
    if (params?.refresh) {
      handleFetch();
    }
  }, [params]);

  if (!questions) return <></>;

  return (
    <>
      <ScrollView
        flex={1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        bg={"gray.100"}
      >
        <TopMenu />

        {questions.map((data) => (
          <Question key={data.id} data={data} />
        ))}
      </ScrollView>
    </>
  );
};
