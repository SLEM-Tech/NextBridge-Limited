# Multi-stage build for Next.js application
# Stage 1: Dependencies
FROM node:22-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci --prefer-offline --no-audit --legacy-peer-deps

# Stage 2: Builder
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 3: Runtime
FROM node:22-alpine AS runtime
WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.next/static ./.next/standalone/.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Expose port 5061
EXPOSE 5061

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5061
ENV HOSTNAME="0.0.0.0"

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", ".next/standalone/server.js"]
