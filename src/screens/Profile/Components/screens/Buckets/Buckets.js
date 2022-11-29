import React from "react";
import { Row } from "native-base";

import { BucketItem } from "./BucketItem";
import { useRandomUsers } from "../../../../../hooks/query/useRandomUsers";
import { useRandomVideos } from "../../../../../hooks/query/useRandomVideos";

export const BucketScreen = () => {
  const amount = 14;
  const { data: videos } = useRandomVideos({
    key: [{ per_page: amount, size: "small" }],
    select: (res) => res.videos,
  });

  const { data: profile } = useRandomUsers({ key: [{ amount }] });

  if (!videos || !profile) return <></>;

  return (
    <Row flexWrap={"wrap"}>
      {videos.map((data, index) => (
        <BucketItem
          data={{ ...data, name: profile.results[index].location.city }}
          key={data.id}
        />
      ))}
    </Row>
  );
};
