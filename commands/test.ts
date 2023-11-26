import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("test")
  .setDescription("Test!");

export async function execute(interaction: CommandInteraction) {
  return interaction.reply("Test!");
}
