package db

import (
	"database/sql"
	"errors"
	"fmt"
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite3"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func InitDB() error {
	var err error
	db, err = sql.Open("sqlite3", "./pkg/db/sqlite/database.db")
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	if err := runMigrations(); err != nil {
		return fmt.Errorf("failed to apply migrations: %w", err)
	}

	log.Println("Database initialized successfully")
	return nil
}

func CloseDB() error {
	if db == nil {
		return nil
	}
	return db.Close()
}

func runMigrations() error {
	log.Println("Running database migrations...")
	source := "file://pkg/db/migrations"
	driver, err := sqlite3.WithInstance(db, &sqlite3.Config{})
	if err != nil {
		return fmt.Errorf("failed to initialize SQLite driver: %w", err)
	}

	migrator, err := migrate.NewWithDatabaseInstance(
		source,
		"sqlite3",
		driver,
	)
	if err != nil {
		return fmt.Errorf("failed to initialize migrator: %w", err)
	}

	// Attempt to apply migrations
	if err := migrator.Up(); err != nil {
		if errors.Is(err, migrate.ErrNoChange) {
			log.Println("No new migrations to apply")
		} else {
			return fmt.Errorf("migration failed: %w", err)
		}
	} else {
		log.Println("Migrations applied successfully")
	}

	return nil
}

// GetDB returns the SQLite driver instance
// func GetDB() (migration.Driver, error) {
// 	if migrator == nil {
// 		return nil, fmt.Errorf("database not initialized")
// 	}
// 	return migrator, nil
// }
