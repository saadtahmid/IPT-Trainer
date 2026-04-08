DROP TABLE IF EXISTS settings;
CREATE TABLE settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    is_visible BOOLEAN NOT NULL DEFAULT 1,
    quiz_password TEXT NOT NULL
);

INSERT INTO settings (is_visible, quiz_password) VALUES (1, '1234');