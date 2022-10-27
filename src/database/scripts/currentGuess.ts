export const currentGuess_SQL = `
  SELECT guess 
    FROM guesses 
    WHERE 
      guesses.game_id = $gameId and 
      guesses.player_id = $playerId and 
      guesses.score IS NULL
`;
