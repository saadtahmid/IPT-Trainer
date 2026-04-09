CREATE TABLE IF NOT EXISTS admin_settings (
    id INTEGER PRIMARY KEY,
    master_key TEXT NOT NULL
);

INSERT OR IGNORE INTO admin_settings (id, master_key) VALUES (1, 'super_secret_admin_key_123');
