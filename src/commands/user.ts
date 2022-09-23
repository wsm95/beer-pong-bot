import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const User: Command = {
    name: "user",
    description: "Returns info on the user",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};