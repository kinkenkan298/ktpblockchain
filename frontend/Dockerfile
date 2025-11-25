FROM oven/bun:1 AS deps
WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

FROM oven/bun:1 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# Load contract addresses and build
RUN node load-contracts.js && bun run build

FROM oven/bun:1 AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock* ./
COPY --from=builder /app/server.ts ./server.ts

# Copy public directory if exists
COPY --from=builder /app/public ./public

# Copy database-related files for migrations and seeding
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/src ./src
COPY --from=builder /app/.env* ./

# Copy node_modules from builder (includes all dependencies needed by the build)
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun run -e "fetch('http://localhost:3000').then(() => process.exit(0)).catch(() => process.exit(1))"

# Run database migrations and seed before starting the server
CMD bun run db:migrate && bun run db:seed && bun run start
