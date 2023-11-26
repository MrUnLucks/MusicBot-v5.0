import { REST, Routes } from "discord.js";
import { config } from "./config";
import commands from "./commands";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

console.log("Started refreshing application (/) commands...");

rest
  .put(
    Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.GUILD_ID),
    {
      body: commandsData,
    }
  )
  .then(() => console.log("Successfully reloaded application (/) commands."))
  .catch((error) => console.error(error));
