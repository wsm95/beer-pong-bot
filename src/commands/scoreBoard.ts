import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";
import { scoreDictionary } from "../Bot";

export const ScoreBoard: Command = {
  name: "scoreboard",
  description: "Responds with the current scores",
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    let content = "";
    for (const userId in scoreDictionary) {
      content += `${scoreDictionary[userId].tag}: ${scoreDictionary[userId].score}`;
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
