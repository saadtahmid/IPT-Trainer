DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT 0,
    quiz_password TEXT NOT NULL
);

INSERT INTO categories (code, name, is_visible, quiz_password) VALUES 
('SNK', 'সৈনিক', 1, '1234'),
('NCO', 'এনসিও', 1, '1234'),
('JCO', 'জেসিও', 1, '1234'),
('NCO_Course', 'এনসিও কোর্স', 1, '1234'),
CREATE TABLE IF NOT EXISTS admin_settings (
    id INTEGER PRIMARY KEY,
    master_key TEXT NOT NULL
);

INSERT INTO admin_settings (id, master_key) VALUES (1, 'super_secret_admin_key_123');
CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    player_name TEXT NOT NULL,
    player_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
