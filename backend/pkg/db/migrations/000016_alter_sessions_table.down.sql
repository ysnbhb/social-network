CREATE TABLE old_sessions (
    session_id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    user_uuid TEXT NOT NULL,
    expires_at DATETIME NOT NULL
);

INSERT INTO old_sessions (session_id, user_id, user_uuid, expires_at)
SELECT CAST(id AS TEXT), user_id, user_uuid, expires_at FROM sessions;

DROP TABLE sessions;

ALTER TABLE old_sessions RENAME TO sessions;