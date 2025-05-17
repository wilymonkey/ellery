# --------------------------
# BUILD
# --------------------------

FROM oven/bun:latest AS builder
WORKDIR /build-app
COPY package.json bun.lock app.config.ts tsconfig.json ./
COPY src ./src
COPY public ./public
RUN bun install --frozen-lockfile
RUN bun run build

# --------------------------
# PRODUCTION
# --------------------------

FROM oven/bun:latest
WORKDIR /ellery
COPY --from=builder /build-app ./
RUN pwd && ls
CMD ["bun", "run", "start"]
