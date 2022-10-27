export const endGame_SQL = `
  UPDATE games SET complete=TRUE WHERE id=?
`;
