import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import songFinder from "../utils/songFinder";
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
  const searchResult = await songFinder(query);

  //better error handling for searhresult error
  return interaction.reply({
    embeds: [searchEmbed(searchResult ?? {})],
  });
}
