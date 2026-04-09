CREATE TABLE IF NOT EXISTS admin_settings (
    id INTEGER PRIMARY KEY,
    master_key TEXT NOT NULL
);

INSERT OR IGNORE INTO admin_settings (id, master_key) VALUES (1, 'super_secret_admin_key_123');

CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    player_name TEXT NOT NULL,
    player_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
