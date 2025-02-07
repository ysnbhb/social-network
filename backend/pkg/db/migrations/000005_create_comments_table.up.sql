CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id INTEGER NOT NULL,
    target_id INTEGER NOT NULL,
    FOREIGN KEY(card_id) REFERENCES card(id),
    FOREIGN KEY(target_id) REFERENCES card(id)
);