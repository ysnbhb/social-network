CREATE TABLE group_invitations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(group_id) REFERENCES groups(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    UNIQUE(group_id, user_id)
);
