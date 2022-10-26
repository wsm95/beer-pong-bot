export const updateScore_SQL = `
  INSERT OR REPLACE 
    INTO scores 
  VALUES (
    NULL, 
    $gameId, 
    $playerId, 
    coalesce((SELECT current_score FROM scores WHERE scores.game_id = $gameId and scores.player_id = $playerId), 0) + $score
  );

`;
