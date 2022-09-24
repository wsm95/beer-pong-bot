import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const Server: Command = {
  name: "server",
  description: "Returns info on the server",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = `Server name: ${interaction.guild!.name}\nTotal members: ${
      interaction.guild!.memberCount
    }`;

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
