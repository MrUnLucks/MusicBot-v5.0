import { readdirSync } from "fs";
import { join } from "path";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
export type CommandStructure = {
  execute: Function;
  data: RESTPostAPIChatInputApplicationCommandsJSONBody;
};
const commands: Array<CommandStructure> = [];
const files = readdirSync(join(__dirname, ""));

for (const file of files) {
  if (file.endsWith(".ts") && file !== "index.ts") {
    await import(`./${file}`).then((module: CommandStructure) => {
      commands.push(module);
      console.log(module.data);
    });
  }
}

export default commands;
