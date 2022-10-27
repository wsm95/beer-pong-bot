import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";
import {
  getCurrentGame,
  addGuess,
  getCurrentGuess,
} from "../database/databaseUtils";

export const CurrentGuess: Command = {
  name: "current_guess",
  description: "Responds with your current guess",
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    const member = await interaction.guild?.members.fetch(interaction.user);

    let content = "";
    const currentGame = await getCurrentGame();
    if (currentGame) {
      const currentGuess = await getCurrentGuess(currentGame, member?.id!);

      if (currentGuess) {
        content = `${member?.displayName} currently has a guess of: ${currentGuess}`;
      } else {
        content = "You have no current guesses!";
      }
    } else {
      content = "No games currently started!";
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
