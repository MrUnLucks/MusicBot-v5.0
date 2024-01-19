import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import songFinder from "../utils/songFinder";

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
  const searchResults = await songFinder(query);
  console.log(searchResults);

  return interaction.reply("Pong!");
}
