import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandNumericOption, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../Command";
import { guessDictionary } from "../Bot";

export const Guess: Command = {
    name: "guess",
    description: "Submit a guess",
    type: ApplicationCommandType.ChatInput,
    options: [{ 
        name: "guess",
        description: "A number between 0-1000",
        type: ApplicationCommandOptionType.Integer,
        minValue:0,
        maxValue: 1000
      } as ApplicationCommandNumericOption
    ],
    run: async (_: Client, interaction: CommandInteraction) => {
        const guess = interaction.options.get("guess")?.value! as number;

        const content = `${interaction.user.tag} throws in a guess of: ${guess}`;
        guessDictionary[interaction.user.id] = { guess, tag: interaction.user.tag }

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};