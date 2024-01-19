import ytSearch from "yt-search";
export default async (query: string, index = 0) => {
  let songResult = await ytSearch(query);
  return songResult.videos.length > 1 ? songResult.videos[index] : null;
};
