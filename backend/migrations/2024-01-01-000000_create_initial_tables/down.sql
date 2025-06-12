-- Drop tables in reverse order (respecting foreign key constraints)
DROP TABLE IF EXISTS user_favorites;
DROP TABLE IF EXISTS model_views;
DROP TABLE IF EXISTS models_3d;
DROP TABLE IF EXISTS users;

-- Drop UUID extension (optional, might be used by other things)
-- DROP EXTENSION IF EXISTS "uuid-ossp";