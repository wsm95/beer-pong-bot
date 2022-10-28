import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const Scoring: Command = {
  name: "scoring",
  description: "Returns the scoring breakdown for results",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = `\`\`\`
      Diff: Points
      0-5: 10
      6-30: 8
      31-60: 6
      61-90: 4
      91-150: 2
      151-200: 1
      201-300: 0
      301-350: -1
      351-410: -2
      411-440: -4
      441-470: -6
      471-495: -8
      496-500: -10 
    \`\`\``;

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
