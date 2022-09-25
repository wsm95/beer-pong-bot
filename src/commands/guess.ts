import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandNumericOption,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Command";
import { guessDictionary } from "../Bot";

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

    const content = `${member?.nickname} throws in a guess of: ${guess}`;
    guessDictionary[interaction.user.id] = { guess, member };

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
