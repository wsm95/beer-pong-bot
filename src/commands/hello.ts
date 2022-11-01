import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const Hello: Command = {
  name: "hello_there",
  description: "Returns a greeting",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    // const content =
    //   "https://media.tenor.com/QFSdaXEwtBAAAAAC/hello-there-general-kenobi.gif";

    const content = "<@&1035382395706298388>";

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
