#!/bin/bash
# A simple script to test the authentication endpoints

BASE_URL="${BACKEND_API_URL:-http://localhost:8080/api}"

# Register a new user
echo "Registering a new user..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","full_name":"Test User"}')

echo "\nRegistration Response:\n$REGISTER_RESPONSE"

# Login with the user
echo "\nLogging in..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username_or_email":"testuser","password":"password123"}')

echo "\nLogin Response:\n$LOGIN_RESPONSE"

# Extract the access token from the login response
ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"access_token":"[^"]*"' | cut -d '"' -f 4)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "\nFailed to extract access token from response. Authentication may have failed."
  exit 1
fi

echo "\nExtracted token: $ACCESS_TOKEN"

# Get user profile using the access token
echo "\nGetting user profile..."
PROFILE_RESPONSE=$(curl -s -X GET "$BASE_URL/auth/me" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "\nProfile Response:\n$PROFILE_RESPONSE"

# Try accessing protected user list endpoint
echo "\nAccessing protected users endpoint..."
USERS_RESPONSE=$(curl -s -X GET "$BASE_URL/users" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "\nUsers Response:\n$USERS_RESPONSE"

# Logout
echo "\nLogging out..."
LOGOUT_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/logout" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "\nLogout Response:\n$LOGOUT_RESPONSE"

echo "\nAuthentication flow testing completed."
