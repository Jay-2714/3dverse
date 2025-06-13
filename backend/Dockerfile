# Stage 1: Build
FROM rust:latest as builder

WORKDIR /app

RUN apt-get update && \
    apt-get install -y pkg-config libssl-dev libpq-dev && \
    rm -rf /var/lib/apt/lists/*

COPY . .


RUN cargo build --release


# Stage 2: Runtime
FROM debian:bookworm-slim

# Ensure shared libraries are available
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libssl3 \
        libpq5 \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Optional: Check where libpq is installed (for debugging)
# RUN find / -name "libpq.so*"

COPY --from=builder /app/target/release/backend /usr/local/bin/backend

# Optional: Add LD_LIBRARY_PATH (rarely needed, but for safety)
ENV LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH

EXPOSE 8080
CMD ["backend"]
