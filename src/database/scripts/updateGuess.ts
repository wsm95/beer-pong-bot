export const updateGuess_SQL = `
  UPDATE guesses 
    SET score = $score 
  WHERE guesses.game_id = $gameId AND 
        guesses.player_id = $playerId and 
        guesses.id = $guessId
`;
