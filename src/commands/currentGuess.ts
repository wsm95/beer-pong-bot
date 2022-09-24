import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandStringOption,
  ApplicationCommandNumericOption,
} from "discord.js";
import { Command } from "../Command";
import { guessDictionary } from "../Bot";

export const CurrentGuess: Command = {
  name: "current_guess",
  description: "Responds with your current guess",
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    let content = "";
    if (!guessDictionary[interaction.user.id]) {
      content = `${interaction.user.tag} does not have a current guess`;
    }

    content = `${interaction.user.tag} current guess is ${
      guessDictionary[interaction.user.id].guess
    }`;

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
