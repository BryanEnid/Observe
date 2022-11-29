// I think we would need GraphQl to fetch necessary files Ex: video by size and quality

import { useRandomVideos } from "../../../../../hooks/query/useRandomVideos";

export const useExperienceDummyData = () => {
  const { data: videoAssets } = useRandomVideos({
    key: [{ per_page: 2, size: "small" }, "experience"],
  });

  if (!videoAssets?.videos) return null;

  const video = (i) =>
    videoAssets.videos[i].video_files.find((video) => video.quality === "sd");

  return [
    {
      id: 45001,
      title: "CEO & Product Architect",
      company: "Tesla Motors, Inc",
      logo: "http://cdn2.insidermonkey.com/blog/wp-content/uploads/2015/03/TSLA-Tesla-Logo-Red.jpg",
      from: "Feb 2003",
      to: null,
      present: true,
      video: {
        id: video(0).id,
        width: video(0).width,
        height: video(0).height,
        video_url: video(0).link,
        video_picture: videoAssets.videos[0].video_pictures[0].picture,
      },
    },
    {
      id: 45003,
      title: "CEO & Chief Engineer",
      company: "SpaceX",
      logo: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Famalyahenderson.com%2Fimages%2Fspacex-logo.jpg&f=1&nofb=1",
      from: "Feb 2003",
      to: null,
      present: true,
      video: {
        id: video(1).id,
        width: video(1).width,
        height: video(1).height,
        video_url: video(1).link,
        video_picture: videoAssets.videos[1].video_pictures[0].picture,
      },
    },
  ];
};

export const useEducationDummyData = () => {
  const { data: videoAssets } = useRandomVideos({
    key: [{ per_page: 1, size: "small" }, "education"],
  });

  if (!videoAssets?.videos) return null;

  const video = (i) =>
    videoAssets.videos[i].video_files.find((video) => video.quality === "sd");

  return [
    {
      id: 45002,
      title: "MIT University",
      degree: "B.S. Electrical Engineering",
      logo: "http://appinventor.mit.edu/explore/sites/explore.appinventor.mit.edu/files/MIT_Logo.png",
      from: "1980",
      to: "1984",
      preset: false,
      video: {
        id: video(0).id,
        width: video(0).width,
        height: video(0).height,
        video_url: video(0).link,
        video_picture: videoAssets.videos[0].video_pictures[0].picture,
      },
    },
  ];
};
