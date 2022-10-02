import { Command } from "./Command";
import { Hello } from "./commands/hello";
import { User } from "./commands/user";
import { Server } from "./commands/server";
import { Guess } from "./commands/guess";
import { CurrentGuess } from "./commands/currentGuess";
import { Pitch } from "./commands/pitch";
import { ScoreBoard } from "./commands/scoreBoard";
import { RandomGuess } from "./commands/randomGuess";

export const Commands: Command[] = [
  Hello,
  User,
  Server,
  Guess,
  CurrentGuess,
  Pitch,
  ScoreBoard,
  RandomGuess,
];
