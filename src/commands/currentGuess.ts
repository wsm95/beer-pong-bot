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
      content = `Submit a guess!`;
    } else {
      const { guess, member } = guessDictionary[interaction.user.id];
      console.log(member);
      content = `${member?.displayName}'s current guess is ${guess}`;
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
