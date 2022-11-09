import { ScrollView } from "native-base";
import React from "react";
import { Question } from "./Posts/Question";
import { TopMenu } from "./TopMenu";
import { useRandomVideos } from "../../hooks/query/useRandomVideos";
import { Loading } from "../../components/Loading";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";
import { useQuestions } from "../../hooks/useQuestions";
import { RefreshControl } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const count = 10;

export const Feed = () => {
  // const { data: videos } = useRandomVideos({
  //   key: [{ per_page: count, size: "small" }],
  //   select: (res) => res.videos,
  // });
  // const { data: users } = useRandomUsers({
  //   key: [{ amount: count }, "Feed"],
  //   select: (res) => res.results,
  // });

  // if (!videos || !users) return <Loading />;

  const { getQuestions } = useQuestions();
  const { params } = useRoute();

  const [questions, setQuestions] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleFetch();
  }, []);

  const handleFetch = () => {
    return getQuestions().then((data) => {
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
      >
        <TopMenu />

        {/* {videos.map(({ image, video_files, id }, index) => {
          return (
            <Question
              key={id}
              data={{
                image,
                video: video_files[0],
                question: "How do you usually start to design a screen?",
              }}
              user={users[index]}
            />
          );
        })} */}
        {questions.map((data) => (
          <Question key={data.id} data={data} />
        ))}
      </ScrollView>
    </>
  );
};
