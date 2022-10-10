import { ScrollView } from "native-base";
import React from "react";
import { Question } from "./Posts/Question";
import { TopMenu } from "./TopMenu";
import { useRandomVideos } from "../../hooks/query/useRandomVideos";
import { Loading } from "../../components/Loading";
import { useRandomUsers } from "../../hooks/query/useRandomUsers";

const count = 10;

export const Feed = () => {
  const { data: videos } = useRandomVideos({
    key: [{ per_page: count }],
    select: (res) => res.videos,
  });
  const { data: users } = useRandomUsers({
    key: [{ amount: count }, "Feed"],
    select: (res) => res.results,
  });

  if (!videos || !users) return <Loading />;

  return (
    <>
      <ScrollView flex={1}>
        <TopMenu />

        {videos.map(({ image, video_files, id }, index) => {
          return (
            <Question
              key={id}
              data={{ image, video: video_files[0] }}
              user={users[index]}
            />
          );
        })}
      </ScrollView>
    </>
  );
};
