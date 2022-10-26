export const createTables_SQL = `  
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    complete INTEGER
  );

  CREATE TABLE IF NOT EXISTS guesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    player_id TEXT NOT NULL,
    guess INTEGER,
    score INTEGER NULL,
    UNIQUE (game_id, player_id),
    FOREIGN KEY(game_id) REFERENCES games(id)
  );

  CREATE TABLE IF NOT EXISTS pitches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    pitch INTEGER,
    FOREIGN KEY(game_id) REFERENCES games(id)
  );

  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    player_id TEXT,
    current_score INTEGER DEFAULT 0,
    FOREIGN KEY(game_id) REFERENCES games(id)
  );
  CREATE UNIQUE INDEX IF NOT EXISTS scores_idx ON scores(game_id, player_id);
`;
