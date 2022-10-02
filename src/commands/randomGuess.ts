import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const RandomGuess: Command = {
  name: "random_guess",
  description: "Returns a random guess",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "What about.....69??";

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
