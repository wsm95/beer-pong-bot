import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { endGame, getCurrentGame } from "../database/databaseUtils";
import { Command } from "../Command";
import { printScoreboard } from "./scoreBoard";

export const EndGame: Command = {
  name: "end_game",
  description: "Ends the current game of beer pong",
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    let content = "";

    const currentGame = await getCurrentGame();
    if (currentGame) {
      content =
        "Alright fake beer ponger, that's the game! Lets see how we all did.\n\n";

      content += await printScoreboard(currentGame, interaction);

      await endGame(currentGame);
    } else {
      content =
        "No game currently in progress!\nPlease use the /start_game command first.";
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
