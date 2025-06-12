# Rust Actix Web Backend

This is a backend REST API built with Rust and the Actix Web framework.

## Project Structure

```
src/
├── config/       # Application configuration
├── db/           # Database connections and repositories
├── errors/       # Error handling
├── handlers/     # Request handlers
├── middleware/   # Custom middleware
├── models/       # Data models
├── routes/       # API route definitions
├── utils/        # Utility functions
└── main.rs       # Application entry point
```

## Prerequisites

- Rust (latest stable version)
- Cargo

## Getting Started

1. Clone the repository
2. Navigate to the project directory
3. Copy `.env.example` to `.env` and adjust settings if necessary
4. Build and run the application:

```bash
cargo build
cargo run
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Development

To run the application in development mode with auto-reload:

```bash
cargo-watch -x run
```

Or if you have cargo-watch installed:

```bash
cargo watch -x run
```

## Testing

To run tests:

```bash
cargo test
```

## Build for Production

```bash
cargo build --release
```

The optimized binary will be available in the `target/release` directory.
