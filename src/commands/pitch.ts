import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandNumericOption,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Command";
import { guessDictionary, scoreDictionary } from "../Bot";

const diff = (guess: number, pitch: number): number => {
  let diff = Math.abs(pitch - guess);
  if (diff > 500) {
    diff = 1000 - diff;
  }

  return diff;
};

const calcScore = (diff: number) => {
  if (diff === 0) {
    return 10;
  } else if (diff < 30) {
    return 7;
  } else if (diff < 75) {
    return 5;
  } else if (diff < 150) {
    return 3;
  } else if (diff < 200) {
    return 1;
  } else if (diff < 300) {
    return 0;
  } else if (diff === 500) {
    return -3;
  }

  return -1;
};

export const Pitch: Command = {
  name: "pitch",
  description: "Submit a pitch and responds with scores for the round",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "pitch",
      description: "A number between 0-1000",
      type: ApplicationCommandOptionType.Integer,
      minValue: 0,
      maxValue: 1000,
    } as ApplicationCommandNumericOption,
  ],
  run: async (_: Client, interaction: CommandInteraction) => {
    const pitch = interaction.options.get("pitch")?.value! as number;

    let content = "";
    for (const userId in guessDictionary) {
      const guessUser = guessDictionary[userId];

      const difference = diff(pitch, guessUser.guess);
      const score = calcScore(difference);

      if (!scoreDictionary[userId]) {
        scoreDictionary[userId] = { score: 0, tag: guessUser.tag };
      }
      scoreDictionary[userId].score += score;

      content += `${guessUser.tag} guessed ${guessUser.guess} for a diff of ${difference}, scoring ${score}\n`;
      delete guessDictionary[userId];
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
