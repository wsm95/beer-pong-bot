import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";
import { currentScores, getCurrentGame } from "../database/databaseUtils";

export const printScoreboard = async (
  currentGameId: number,
  interaction: CommandInteraction
): Promise<string> => {
  const scores = await currentScores(currentGameId);

  let scoreBoard = "**Scoreboard**\n";
  for (const score of scores) {
    var user = await interaction.guild?.members.fetch(score.player_id);
    scoreBoard += `\`\`\`${user?.displayName}: ${score.current_score}\n\`\`\``;
  }

  return scoreBoard;
};

export const ScoreBoard: Command = {
  name: "scoreboard",
  description: "Responds with the current scores",
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    let content = "";

    const currentGame = await getCurrentGame();
    if (currentGame) {
      content = await printScoreboard(currentGame, interaction);
    } else {
      content = "No games currently started!";
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
