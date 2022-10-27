import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandNumericOption,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Command";
import { printScoreboard } from "./scoreBoard";
import {
  addPitch,
  getAllCurrentGuesses,
  getCurrentGame,
  updateGuess,
  updateScore,
} from "../database/databaseUtils";

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
    let content = "The pitch is in! Lets ping some fake beer pongers.\n\n";
    content += "**Pitch: " + pitch + "**\n";

    const currentGame = await getCurrentGame();
    if (currentGame) {
      const currentGuesses = await getAllCurrentGuesses(currentGame);
      for (const currentGuess of currentGuesses) {
        console.log("currentGuess: " + JSON.stringify(currentGuess, null, 4));

        const difference = diff(pitch, currentGuess.guess);
        const score = calcScore(difference);

        console.log("differnce: " + difference);
        console.log("score: " + score);

        await updateGuess(
          currentGame,
          currentGuess.player_id,
          currentGuess.id,
          score
        );

        await updateScore(currentGame, currentGuess.player_id, score);

        content += `<@${currentGuess.player_id}> guessed ${currentGuess.guess} for a diff of ${difference}, scoring ${score}\n`;
      }

      await addPitch(currentGame, pitch);
      content += "\n" + (await printScoreboard(currentGame, interaction));
    } else {
      content = "No games currently started!";
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
