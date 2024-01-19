import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import songFinder from "../utils/songFinder";
import { searchEmbed } from "../style/embed";

export const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Search song")
  .addStringOption((option) =>
    option
      .setName("song")
      .setDescription("The input to echo back")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const query = interaction.options.get("song")?.value?.toString();
  if (!query) {
    return interaction.reply("This field cannot be empty");
  }
  const searchResult = await songFinder(query);
  console.log(searchResult);

  //better error handling for searhresult error
  return interaction.reply({
    embeds: [searchEmbed(searchResult ?? {})],
  });
}
