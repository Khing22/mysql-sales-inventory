# final-sales-inventory

## Data persistence

Application data is saved atomically to `data/store.json` after each change, so logging out or restarting the app does not reset inventory, orders, sales, returns, suppliers, or users. Keep the `data` directory on persistent storage when deploying the app; an ephemeral deployment filesystem can still discard files when its host is replaced.

### MySQL

The app loads database settings from `.env` at startup. Configure `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`; `DB_NAME` must be an existing database, and the configured user needs permission to create/alter tables and read/write rows. The app creates its tables automatically and syncs products, orders, and sales records to MySQL. On first connection, an empty MySQL database is initialized from `data/store.json`; thereafter MySQL is authoritative for those records and the JSON file remains a recovery copy. Suppliers, returns, and users continue to be stored in the JSON file.