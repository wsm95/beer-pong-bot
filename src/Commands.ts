import { Command } from "./Command";
import { Hello } from "./commands/hello";
import { User } from "./commands/user";
import { Server } from "./commands/server";
import { Guess } from "./commands/guess";
import { CurrentGuess } from "./commands/currentGuess";
import { Pitch } from "./commands/pitch";
import { ScoreBoard } from "./commands/scoreBoard";
import { RandomGuess } from "./commands/randomGuess";
import { StartGame } from "./commands/startGame";
import { EndGame } from "./commands/endGame";
import { Scoring } from "./commands/scoring";

export const Commands: Command[] = [
  Hello,
  Guess,
  CurrentGuess,
  Pitch,
  ScoreBoard,
  RandomGuess,
  StartGame,
  EndGame,
  Scoring,
];
