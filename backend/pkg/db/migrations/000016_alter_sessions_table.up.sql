CREATE TABLE new_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    user_uuid TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

INSERT INTO new_sessions (user_id, user_uuid, expires_at)
SELECT user_id, user_uuid, expires_at FROM sessions;

DROP TABLE sessions;

ALTER TABLE new_sessions RENAME TO sessions;