CREATE TABLE event_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    response TEXT NOT NULL, -- going or not going
    FOREIGN KEY(event_id) REFERENCES events(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    UNIQUE(event_id, user_id)
);