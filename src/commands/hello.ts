import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const Hello: Command = {
    name: "hello_there",
    description: "Returns a greeting",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "general kenobi!";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};