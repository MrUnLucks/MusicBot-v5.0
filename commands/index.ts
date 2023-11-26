import { readdirSync } from "fs";
import { join } from "path";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
export type CommandStructure = {
  execute: Function;
  data: RESTPostAPIChatInputApplicationCommandsJSONBody;
};
const commands: Array<CommandStructure> = [];
const files = readdirSync(join(__dirname, ""));
//Its not currently possible to have a Synchronous import while in CJS, it can be resolved using an experimental top level await(https://stackoverflow.com/questions/51069002/convert-import-to-synchronous)
for (const file of files) {
  if (file.endsWith(".ts") && file !== "index.ts") {
    await import(`./${file}`).then((module: CommandStructure) => {
      commands.push(module);
      console.log(module.data);
    });
  }
}

export default commands;
