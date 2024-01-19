// at the top of your file
import { Embed } from "discord.js";
import { VideoSearchResult } from "yt-search";

type OptionaVideoSearchResult = Partial<VideoSearchResult>;
const failedToFetchString = "Failed to fetch data";

// Embeds supports markdown
// !!Don't remove footer or icon_url, it gives TS errors since the 'Embed' type is not built correctly
const searchEmbed = (options: OptionaVideoSearchResult): Embed => ({
  color: 0x7314f5,
  title: options.title ?? failedToFetchString,
  url: options.url ?? null,
  author: {
    name: options.author?.name ?? failedToFetchString,
    url: options.author?.url,
  },
  description: `Duration: ${
    options.duration?.timestamp ?? failedToFetchString
  }`,
  thumbnail: {
    url: options.thumbnail ?? "https://i.imgur.com/AfFp7pu.png",
  },
  footer: {
    text: "",
    icon_url: undefined,
  },
});

export { searchEmbed };
