@echo off
echo Setting up authentication system for Meshly...
echo.

echo Step 1: Installing dependencies...
npm install
echo.

echo Step 2: Generating Prisma client...
npx prisma generate
echo.

echo Step 3: Running database migrations...
npx prisma db push
echo.

echo Step 4: Setting up environment variables...
echo Please make sure to update your .env.local file with the following:
echo - DATABASE_URL (PostgreSQL connection string)
echo - BETTER_AUTH_SECRET (32+ character secret key)
echo - Social provider credentials (Google, GitHub, Twitter)
echo - RESEND_API_KEY (for email verification)
echo.

echo Step 5: Building the application...
npm run build
echo.

echo Authentication setup complete!
echo.
echo Next steps:
echo 1. Update your .env.local file with actual values
echo 2. Set up your PostgreSQL database
echo 3. Configure social authentication providers
echo 4. Test the authentication flow
echo.
echo To start the development server: npm run dev
echo To start the backend server: cd backend && cargo run
pause
