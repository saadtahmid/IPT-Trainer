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
('JCO_Course', 'জেসিও কোর্স', 1, '1234');