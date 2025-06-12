# Docker Setup for Meshly 3dverse

## Overview

This project uses Docker to provide a consistent development environment across all platforms. The Docker setup includes:

- A Next.js frontend application (port 4500)
- A Rust backend service (port 8080)
- A PostgreSQL database (port 5432)

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Environment Setup

Make sure you have the necessary environment variables set up in your `.env` file. A sample is provided in `.env.sample`.

```bash
# Copy the sample env file if you don't have one
cp .env.sample .env
```

Update the values in the `.env` file to match your setup if needed.

### 2. Building and Starting the Services

To build and start all the services, run:

```bash
docker-compose up --build
```

This will:
- Build the frontend, backend, and database services
- Start all services in the foreground with logs visible

To run in detached mode (background):

```bash
docker-compose up -d
```

### 3. Accessing the Services

- Frontend: http://localhost:4500
- Backend API: http://localhost:8080
- PostgreSQL: localhost:5432 (use a database client like pgAdmin or DBeaver)

### 4. Stopping the Services

To stop all services:

```bash
# If running in foreground, use Ctrl+C
# If running in detached mode
docker-compose down
```

To remove volumes when stopping (this will delete all data in the database):

```bash
docker-compose down -v
```

## Development Workflow

### Running Migrations

To run Prisma migrations:

```bash
docker-compose exec app npx prisma migrate dev
```

### Viewing Logs

If running in detached mode, view logs with:

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs app
docker-compose logs backend
docker-compose logs postgres
```

### Rebuilding Individual Services

If you only need to rebuild one service:

```bash
docker-compose up -d --build app
```

## Troubleshooting

### Connection Issues

If the frontend can't connect to the backend or database:
- Ensure all services are running with `docker-compose ps`
- Check the logs for error messages
- Verify the environment variables are correctly set

### Database Connectivity

If the application can't connect to the database:
- Check if the PostgreSQL container is healthy: `docker-compose ps postgres`
- Ensure the database URL is correct in the .env file
- The database connection string inside containers should use the service name as hostname: `postgresql://postgres:postgres@postgres:5432/postgres`

### Common Errors

- "Connection refused" - Usually means a service isn't running or isn't accessible on expected port
- "Prisma error" - May indicate database migration issues
