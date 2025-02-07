package db

import (
	"embed"
	"fmt"
	"log"

	"github.com/Boostport/migration"
)

var embedFS embed.FS

var migrator migration.Driver

func InitDB() error {
	migrationSource := &migration.EmbedMigrationSource{
		EmbedFS: embedFS,
		Dir:     "migrations",
	}

	// Define the driver configuration
	driverConfig := map[string]string{
		"driver": "sqlite",
		"dsn":    "file:./pkg/db/app.db",
	}

	// Create the driver dynamically
	driver, err := migration.(driverConfig)
	if err != nil {
		return fmt.Errorf("failed to initialize driver: %v", err)
	}
	migrator = driver

	// Apply pending migrations
	log.Println("Applying migrations...")
	applied, err := migration.Migrate(migrator, migrationSource, migration.Up, 0) // Apply all up migrations
	if err != nil {
		return fmt.Errorf("failed to apply migrations: %v", err)
	}

	log.Printf("Successfully applied %d migrations.\n", applied)
	log.Println("Database initialized and migrations applied successfully.")
	return nil
}

// GetDB returns the SQLite driver instance
func GetDB() (migration.Driver, error) {
	if migrator == nil {
		return nil, fmt.Errorf("database not initialized")
	}
	return migrator, nil
}
