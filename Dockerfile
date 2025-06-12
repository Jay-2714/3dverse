FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application (optional for development)
# RUN pnpm run build

# Expose the port the app runs on
EXPOSE 4500

# Command to run the application
CMD ["pnpm", "run", "dev"]
