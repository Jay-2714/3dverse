# Authentication System Documentation

## Overview

This backend implements a JWT-based authentication system. JSON Web Tokens (JWT) are used to securely transmit information between parties as a JSON object. The tokens are digitally signed using a secret key, which ensures that the claims cannot be altered after the token is issued.

## Features

- User registration
- User login/authentication
- Password hashing with Argon2id (secure password hashing)
- JWT token generation and validation
- Role-based authorization
- Protected API endpoints

## Authentication Flow

1. **Registration**: Users register with username, email, and password
2. **Login**: Users provide credentials and receive a JWT token
3. **API Access**: The JWT token is included in the Authorization header for subsequent requests
4. **Token Validation**: The server validates the token for protected endpoints
5. **Logout**: Client discards the token (stateless authentication)

## API Endpoints

### Public Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT token
- `GET /api/health` - Health check

### Protected Endpoints

- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout (client-side token removal)
- `GET /api/users` - List all users
- `POST /api/users` - Create a new user (admin only)
- `GET /api/users/{id}` - Get a specific user
- `PUT /api/users/{id}` - Update a user
- `DELETE /api/users/{id}` - Delete a user (admin only)

## Request/Response Examples

### Registration

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "New User"
}
```

### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "username_or_email": "newuser",
  "password": "securepassword"
}
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "username": "newuser",
    "email": "user@example.com",
    "full_name": "New User",
    "role": "User"
  }
}
```

## Authentication Middleware

The authentication middleware intercepts requests to protected endpoints and:

1. Extracts the JWT token from the Authorization header
2. Validates the token's signature and expiration
3. Extracts the user information and adds it to the request context
4. Allows the request to proceed if authentication is successful

## Security Considerations

- JWT secret key is stored in environment variables
- Passwords are hashed using Argon2id (winner of the Password Hashing Competition)
- Tokens have an expiration time
- Authorization header with Bearer scheme is used for token transmission

## Testing Authentication

You can test the authentication flow using the provided `test_auth.sh` script:

```bash
# Make the script executable
chmod +x test_auth.sh

# Run the script
./test_auth.sh
```

This will register a new user, login, access protected endpoints, and logout.

## Configuration

Authentication settings are configured in the `.env` file:

- `JWT_SECRET`: Secret key used to sign tokens
- `TOKEN_EXPIRY_HOURS`: Token validity period in hours
