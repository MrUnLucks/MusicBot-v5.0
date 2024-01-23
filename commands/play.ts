import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import songFinder from "../utils/songFinder";
import {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  StreamType,
} from "@discordjs/voice";
import { searchEmbed } from "../style/embed";

export const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Play a song")
  .addStringOption((option) =>
    option
      .setName("song")
      .setDescription("Search a song or URL")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const query = interaction.options.get("song")?.value?.toString();
  if (!query) {
    return interaction.reply("This field cannot be empty");
  }
  // Create Connection (this later needs to be moved to a separate module)
  if (!interaction.guildId) {
    return interaction.reply("Something went wrong... (GUILD_ID_NOT_DEFINED)");
  }

  if (!interaction.guild?.voiceAdapterCreator) {
    return interaction.reply(
      "Something went wrong... (GUILD_VOICE_ADAPTER_NOT_DEFINED)"
    );
  }
  if (!interaction.member) {
    return interaction.reply(
      "Something went wrong... (INTERACTION_MEMBER_NOT_DEFINED)"
    );
  }
  const voiceChannelId = interaction.member.voice.channelId as string;
  if (!voiceChannelId) {
    return interaction.reply("You need to be in a voice channel");
  }
  const connection = joinVoiceChannel({
    channelId: interaction.member.voice.channelId,
    guildId: interaction.guildId,
    adapterCreator: interaction.guild.voiceAdapterCreator,
  });
  // Create Audio Player
  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  });
  //Subscribe to audio player
  const subscription = connection.subscribe(player);
  // Create Audio Resource
  const resource = createAudioResource(
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    {
      inputType: StreamType.Arbitrary,
    }
  );
  player.play(resource);

  //TODO: better error handling for searchresult error
  const searchResult = await songFinder(query);

  return interaction.reply({
    embeds: [searchEmbed(searchResult ?? {})],
  });
}
