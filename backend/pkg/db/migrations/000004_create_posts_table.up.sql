CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id INTEGER NOT NULL,
    privacy TEXT DEFAULT 'public', -- can be public, private, almost_private
    FOREIGN KEY(card_id) REFERENCES card(id)
);