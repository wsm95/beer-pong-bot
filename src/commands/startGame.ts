import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { getCurrentGame, startGame } from "../database/databaseUtils";
import { Command } from "../Command";

export const StartGame: Command = {
  name: "start_game",
  description: "Starts a game of beer pong",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    let content = "";

    const currentGame = await getCurrentGame();
    if (!currentGame) {
      await startGame();
      content = "Game started!";
    } else {
      content =
        "Game still in progress!\nPlease use the /end_game command first.";
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
