FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Clear any existing node_modules and install dependencies
RUN rm -rf node_modules package-lock.json yarn.lock
RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application for better performance (optional, but recommended)
# RUN pnpm run build

# Expose the port the app runs on
EXPOSE 4500

# Command to run the application
CMD ["pnpm", "run", "dev"]
