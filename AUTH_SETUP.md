# Authentication Setup Guide

This guide will help you set up the complete authentication system for the Meshly 3D model platform.

## Architecture Overview

The authentication system uses:
- **Better Auth** for frontend authentication with social providers
- **Rust backend** with JWT tokens for API authentication  
- **Prisma + PostgreSQL** for user data storage
- **Redux** for client-side state management (legacy support)

## Prerequisites

1. Node.js 18+ and pnpm
2. Rust and Cargo
3. PostgreSQL database
4. Social provider accounts (Google, GitHub, Twitter)

## Setup Instructions

### 1. Environment Configuration

Update `.env.local` with your actual values:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/meshly_db"

# Better Auth
BETTER_AUTH_SECRET="your-32-character-secret-key-here"
BETTER_AUTH_URL="http://localhost:4500"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:4500"

# Social Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"

# Email Service
RESEND_API_KEY="your-resend-api-key"

# Admin
NEXT_PUBLIC_ADMIN_EMAIL="admin@meshly.com"
```

Update `backend/.env` with:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/meshly_db
JWT_SECRET=your-jwt-secret-key-here-at-least-32-characters
RESEND_API_KEY=your-resend-api-key
CORS_ALLOWED_ORIGINS=http://localhost:4500,http://localhost:3000
```

### 2. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# View database in Prisma Studio (optional)
npx prisma studio
```

### 3. Social Provider Setup

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:4500/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`

#### GitHub OAuth Setup
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL:
   - `http://localhost:4500/api/auth/callback/github`

#### Twitter OAuth Setup
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create new app
3. Set callback URLs:
   - `http://localhost:4500/api/auth/callback/twitter`

### 4. Email Service Setup

1. Sign up for [Resend](https://resend.com/)
2. Get your API key
3. Verify your domain (for production)

## Running the Application

### Development Mode

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend
cd backend
cargo run
```

### Production Mode

```bash
# Build frontend
npm run build
npm start

# Build and run backend
cd backend
cargo build --release
./target/release/backend
```

## Authentication Flow

### Email/Password Registration
1. User submits registration form
2. Better Auth creates user account
3. Verification email sent via Resend
4. User clicks verification link
5. Account activated, user can login

### Social Authentication
1. User clicks social provider button
2. Redirected to provider OAuth
3. User authorizes application
4. Redirected back with authentication
5. Better Auth creates/updates user account
6. User logged in automatically

### API Authentication
1. Frontend authentication handled by Better Auth
2. Backend receives JWT tokens for API calls
3. Rust backend validates tokens
4. Protected routes enforce authentication

## Protected Routes

- `/dashboard` - User dashboard (requires authentication)
- `/profile` - User profile (requires authentication)  
- `/upload` - Model upload (requires creator role)
- `/admin` - Admin panel (requires admin role)

## User Roles

- **User** - Basic access, can browse models
- **Creator** - Can upload and manage models
- **Admin** - Full system access

## Security Features

- ✅ JWT token authentication
- ✅ Email verification required
- ✅ Password hashing with Argon2
- ✅ CORS protection
- ✅ Rate limiting (backend)
- ✅ Secure session management
- ✅ Role-based access control
- ✅ Social authentication

## Troubleshooting

### Common Issues

1. **Database connection fails**
   - Check PostgreSQL is running
   - Verify DATABASE_URL format
   - Ensure database exists

2. **Social auth doesn't work**
   - Check redirect URIs match exactly
   - Verify client ID/secret are correct
   - Ensure providers are enabled in auth config

3. **Email verification fails**
   - Check Resend API key is valid
   - Verify sender email is authorized
   - Check email doesn't go to spam

4. **Backend CORS errors**
   - Verify CORS origins include frontend URL
   - Check backend is running on correct port
   - Ensure credentials are supported

### Useful Commands

```bash
# Reset database
npx prisma db push --force-reset

# View logs
npm run dev --verbose

# Test authentication endpoints
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password"}'
```

## File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/route.ts
│   └── verify/page.tsx
├── components/
│   └── auth/
│       ├── ProtectedRoute.tsx
│       └── LogoutButton.tsx
├── lib/
│   ├── auth.tsx (Better Auth config)
│   ├── auth-client.tsx (Client hooks)
│   └── db.ts (Prisma client)
├── middleware.ts (Route protection)
prisma/
└── schema.prisma (Database schema)
backend/
├── src/
│   ├── handlers/
│   │   ├── login.rs
│   │   └── register.rs
│   ├── auth/
│   └── main.rs
```

## Next Steps

1. **Implement password reset functionality**
2. **Add two-factor authentication**
3. **Set up session monitoring**
4. **Add audit logging**
5. **Implement account deletion**
6. **Add social account linking**

For support, check the Better Auth documentation: https://www.better-auth.com/docs
