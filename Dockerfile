# Multi-stage Docker build for Hirezy Platform - MNC Production Ready
# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install Ollama for local Grok AI
RUN apk add --no-cache curl && \
    curl -fsSL https://ollama.com/install | sh

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S hirezy -u 1001

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Change ownership
RUN chown -R hirezy:nodejs /app
USER hirezy

# Expose ports
EXPOSE 3000

# Environment setup
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV GROK_ENDPOINT=http://localhost:11434

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["npm", "start"]
