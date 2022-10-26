export const allCurrentGuess_SQL = `
  SELECT guess, player_id, id FROM guesses WHERE guesses.game_id = $gameId AND guesses.score IS NULL
`;
