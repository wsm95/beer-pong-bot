import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";
import { scoreDictionary } from "../Bot";

export const printScoreboard = (): string => {
  let scoreBoard = "Current scoreboard\n\n";
  for (const userId in scoreDictionary) {
    scoreBoard += `${scoreDictionary[userId].member?.nickname}: ${scoreDictionary[userId].score}\n`;
  }

  return scoreBoard;
};

export const ScoreBoard: Command = {
  name: "scoreboard",
  description: "Responds with the current scores",
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    const content = printScoreboard();

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
