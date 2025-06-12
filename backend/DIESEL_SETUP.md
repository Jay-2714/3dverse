# Diesel ORM Setup Guide

This document explains how to use the Diesel ORM setup in this Rust backend.

## Prerequisites

1. Install Diesel CLI:
```bash
cargo install diesel_cli --no-default-features --features postgres
```

2. Set up your database URL in `.env`:
```bash
cp .env.example .env
# Edit .env and set your DATABASE_URL
```

## Database Setup

### Running Migrations

```bash
# Run all pending migrations
diesel migration run

# Revert the last migration
diesel migration revert

# Check migration status
diesel migration list
```

### Creating New Migrations

```bash
# Create a new migration
diesel migration generate create_new_table
```

### Regenerating Schema

If you modify the database structure:

```bash
diesel print-schema > src/schema.rs
```

## Project Structure

```
src/
├── main.rs              # Application entry point
├── database.rs          # Diesel connection setup
├── schema.rs           # Auto-generated database schema
├── models/             # Database models
│   ├── mod.rs
│   ├── users.rs        # User models
│   └── models_3d.rs    # 3D model related models
├── repositories/       # Database operations
│   ├── mod.rs
│   ├── user_repository.rs
│   └── model_repository.rs
├── handlers/           # Request handlers
└── auth/              # Authentication logic
```

## Database Models

### Users Table
- `id`: UUID (Primary Key)
- `username`: Unique username
- `email`: Unique email address
- `password_hash`: Hashed password
- `created_at`: Timestamp
- `updated_at`: Timestamp (auto-updated)

### Models_3D Table
- `id`: UUID (Primary Key)
- `name`: Model name
- `file_path`: Path to the 3D model file
- `owner_id`: FK to users table
- `description`: Optional description
- `tags`: Array of tags
- `is_public`: Boolean for public visibility
- `created_at`: Timestamp
- `updated_at`: Timestamp (auto-updated)

### Model_Views Table
- `id`: UUID (Primary Key)
- `model_id`: FK to models_3d table
- `viewer_id`: Optional FK to users table
- `view_count`: Number of views
- `last_viewed_at`: Timestamp

### User_Favorites Table
- `id`: UUID (Primary Key)
- `user_id`: FK to users table
- `model_id`: FK to models_3d table
- `created_at`: Timestamp

## Usage Examples

### Creating a New User

```rust
use crate::repositories::user_repository::UserRepository;
use crate::models::users::NewUser;
use crate::database::get_connection;

let mut conn = get_connection()?;
let new_user = NewUser {
    username: "john_doe".to_string(),
    email: "john@example.com".to_string(),
    password_hash: "hashed_password".to_string(),
};

let user = UserRepository::create(&mut conn, new_user)?;
```

### Finding a User by Username

```rust
let mut conn = get_connection()?;
let user = UserRepository::find_by_username(&mut conn, "john_doe")?;
```

### Creating a 3D Model

```rust
use crate::repositories::model_repository::ModelRepository;
use crate::models::models_3d::NewModel3D;

let mut conn = get_connection()?;
let new_model = NewModel3D {
    name: "Cool 3D Model".to_string(),
    file_path: "/uploads/model.obj".to_string(),
    owner_id: user.id,
    description: Some("An awesome 3D model".to_string()),
    tags: Some(vec!["3d".to_string(), "art".to_string()]),
    is_public: true,
};

let model = ModelRepository::create(&mut conn, new_model)?;
```

## Error Handling

The repository layer uses a custom `RepositoryError` enum:

```rust
pub enum RepositoryError {
    DatabaseError(DieselError),
    NotFound,
    ValidationError(String),
    DuplicateEntry(String),
}
```

## Best Practices

1. Always use the repository pattern for database operations
2. Handle errors appropriately using the `RepositoryResult<T>` type
3. Use transactions for operations that modify multiple tables
4. Validate input data before creating repository calls
5. Use connection pooling (already configured) for better performance

## Development Commands

```bash
# Build the project
cargo build

# Run the server
cargo run

# Run tests
cargo test

# Check for issues
cargo clippy

# Format code
cargo fmt
```