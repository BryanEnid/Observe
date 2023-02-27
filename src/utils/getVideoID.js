export const getVideoId = (url) => {
  const pattern =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

  const match = url.match(pattern);

  if (match) return match[1];
  return null;
};
