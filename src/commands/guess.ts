import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandNumericOption,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Command";
import { addGuess, getCurrentGame } from "../database/databaseUtils";

export const Guess: Command = {
  name: "guess",
  description: "Submit a guess",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "guess",
      description: "A number between 0-1000",
      type: ApplicationCommandOptionType.Integer,
      minValue: 0,
      maxValue: 1000,
    } as ApplicationCommandNumericOption,
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const guess = interaction.options.get("guess")?.value! as number;
    const member = await interaction.guild?.members.fetch(interaction.user);

    let content = "";
    const currentGame = await getCurrentGame();
    if (currentGame) {
      await addGuess(currentGame, member?.id!, guess);

      content = `${member?.displayName} throws in a guess of: ${guess}`;
    } else {
      content = "No games currently started!";
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
