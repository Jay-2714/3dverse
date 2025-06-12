# Environment Variables Setup

## Overview
This project uses environment variables to manage sensitive information and configuration settings. This ensures that private URLs, API keys, and secrets are not exposed in the codebase or committed to GitHub.

## Setup Instructions

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` file with your actual values:**
   - Replace all placeholder values with your real credentials
   - Ensure you have valid OAuth app credentials from Google, GitHub, and Twitter
   - Set a secure JWT secret (use a random string generator)

## Environment Variables Reference

### API URLs
- `NEXT_PUBLIC_API_BASE_URL` - Frontend API base URL (default: http://localhost:8000)
- `NEXT_PUBLIC_BACKEND_API_URL` - Backend API URL for frontend requests (default: http://localhost:8080/api)
- `BACKEND_API_URL` - Backend API URL for server-side operations

### Authentication
- `BETTER_AUTH_SECRET` - Secret key for Better Auth (must be secure random string)
- `BETTER_AUTH_URL` - Better Auth service URL
- `ADMIN` - Admin user email/username

### OAuth Credentials
- `GOOGLE_CLIENT_ID` & `GOOGLE_SECRET` - Google OAuth app credentials
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` - GitHub OAuth app credentials  
- `TWITTER_CLIENT_ID` & `TWITTER_SECRET` - Twitter OAuth app credentials

### Database
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_DATABASE_URL` - Public database URL for client-side
- `JWT_SECRET` - Secret for JWT token signing

## Security Notes

- ✅ The `.env` file is already excluded from Git via `.gitignore`
- ✅ Use `.env.example` as a template for required variables
- ❌ Never commit real credentials to the repository
- ❌ Never share your `.env` file contents publicly
- ❌ Never hardcode sensitive URLs or keys in source code

## OAuth App Setup

To get OAuth credentials, you need to create apps on each platform:

1. **Google**: [Google Cloud Console](https://console.cloud.google.com/)
2. **GitHub**: [GitHub Developer Settings](https://github.com/settings/developers)
3. **Twitter**: [Twitter Developer Portal](https://developer.twitter.com/)

For each platform, set the redirect URI to match your application's auth callback.

## Verification

After setup, verify that:
- No hardcoded URLs remain in your source code
- All sensitive credentials are in `.env` file only
- The application can connect to all required services
- OAuth login flows work correctly
