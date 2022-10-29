export const currentScores_SQL = `
  SELECT current_score, player_id FROM scores WHERE scores.game_id = $gameId ORDER BY scores.current_score;
`;
