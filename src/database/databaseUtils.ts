import { Database } from "sqlite3";
import { allCurrentGuess_SQL } from "./scripts/allCurrentGuesses";
import { createTables_SQL } from "./scripts/createTables";
import { currentGuess_SQL } from "./scripts/currentGuess";
import { currentScores_SQL } from "./scripts/currentScores";
import { endGame_SQL } from "./scripts/endGame";
import { insertGuess_SQL } from "./scripts/insertGuess";
import { insertPitch_SQL } from "./scripts/insertPitch";
import { startGame_SQL } from "./scripts/startGame";
import { updateGuess_SQL } from "./scripts/updateGuess";
import { updateScore_SQL } from "./scripts/updateScore";

export const initializeDatabase = async () => {
  await execDatabase(createTables_SQL);
};

export const startGame = async () => {
  await execDatabase(startGame_SQL);
};

export const endGame = async (currentGameId: number) => {
  await updateDatabase(endGame_SQL, currentGameId);
};

export const getCurrentGame = async (): Promise<number | undefined> => {
  // wsm_todo: cache current game id?

  const queriedRows = await queryDatabase<{ id: number; complete: boolean }[]>(
    "SELECT * FROM games WHERE games.complete = FALSE"
  );

  if (!queriedRows || queriedRows.length == 0) {
    return undefined;
  }

  if (queriedRows.length > 1) {
    console.log("More than one active game!");
  }

  return queriedRows[0].id;
};

export const getCurrentGuess = async (
  currentGameId: number,
  playerId: string
): Promise<number | undefined> => {
  const queriedRows = await queryDatabase<{ guess: number }[]>(
    currentGuess_SQL,
    { $gameId: currentGameId, $playerId: playerId }
  );

  if (!queriedRows || queriedRows.length == 0) {
    return undefined;
  }

  return queriedRows[0].guess;
};

export const getAllCurrentGuesses = async (
  currentGameId: number
): Promise<{ guess: number; player_id: string; id: number }[]> => {
  const queriedRows = await queryDatabase<
    { guess: number; player_id: string; id: number }[]
  >(allCurrentGuess_SQL, { $gameId: currentGameId });

  if (!queriedRows || queriedRows.length == 0) {
    return [];
  }

  return queriedRows;
};

export const addGuess = async (
  currentGameId: number,
  playerId: string,
  guess: number
) => {
  await updateDatabase(insertGuess_SQL, {
    $gameId: currentGameId,
    $playerId: playerId,
    $guess: guess,
  });
};

export const updateGuess = async (
  currentGameId: number,
  playerId: string,
  guessId: number,
  score: number
) => {
  await updateDatabase(updateGuess_SQL, {
    $gameId: currentGameId,
    $playerId: playerId,
    $guessId: guessId,
    $score: score,
  });
};

export const updateScore = async (
  currentGameId: number,
  playerId: string,
  score: number
) => {
  await updateDatabase(updateScore_SQL, {
    $gameId: currentGameId,
    $playerId: playerId,
    $score: score,
  });
};

export const currentScores = async (
  currentGameId: number
): Promise<{ current_score: number; player_id: string }[]> => {
  const queriedRows = await queryDatabase<
    { current_score: number; player_id: string }[]
  >(currentScores_SQL, { $gameId: currentGameId });

  if (!queriedRows || queriedRows.length == 0) {
    return [];
  }

  return queriedRows;
};

export const addPitch = async (currentGameId: number, pitch: number) => {
  await updateDatabase(insertPitch_SQL, {
    $gameId: currentGameId,
    $pitch: pitch,
  });
};

const execDatabase = async (query: string) => {
  try {
    await new Promise<void>((resolve, reject) => {
      const database = new Database("beer-pong-bot-db.sqlite");
      database.exec(query, (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });

      database.close();
    });
  } catch (e) {
    console.log(
      "Excpetion caught in execDatabase: " + JSON.stringify(e, null, 4)
    );
  }
};

const updateDatabase = async (query: string, params: any) => {
  await new Promise<void>(async (resolve, reject) => {
    try {
      const database = new Database("beer-pong-bot-db.sqlite");

      database
        .prepare(query, async (error) => {
          if (error) {
            reject(error);
          }
        })
        .run(params, async (error) => {
          if (error) {
            reject(error);
          }

          resolve();
        })
        .finalize();

      database.close();
    } catch (e) {
      console.log(
        "Excpetion caught in updateDatabase: " + JSON.stringify(e, null, 4)
      );
    }
  });
};

const queryDatabase = async <T>(query: string, params?: any): Promise<T> => {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const database = new Database("beer-pong-bot-db.sqlite");

      database.all(query, params, async (error: Error, rows: T) => {
        if (error) {
          reject(error);
        }
        console.log("Row returned: " + JSON.stringify(rows, null, 4));

        resolve(rows);
      });

      database.close();
    } catch (e) {
      console.log(
        "Excpetion caught in queryDatabase: " + JSON.stringify(e, null, 4)
      );
    }
  });
};
