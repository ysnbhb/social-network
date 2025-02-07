CREATE TABLE followers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    follower_id INTEGER NOT NULL,
    following_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(follower_id) REFERENCES users(id),
    FOREIGN KEY(following_id) REFERENCES users(id),
    UNIQUE(follower_id, following_id)
);