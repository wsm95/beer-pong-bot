export const insertGuess_SQL = `
  INSERT OR REPLACE INTO guesses (game_id, player_id, guess) VALUES ($gameId, $playerId, $guess)
`;
