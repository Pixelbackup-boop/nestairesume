# Backend Dockerfile - Express.js with Puppeteer
# Multi-stage build for smaller production image

# ============================================
# Stage 1: Builder
# ============================================
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./
COPY prisma ./prisma/

# Install ALL dependencies (including dev) for building
RUN npm ci

# Copy source and build
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# ============================================
# Stage 2: Production
# ============================================
FROM node:20-slim AS production

# Install Chrome dependencies (shared libs needed by any Chrome/Chromium binary)
# Puppeteer will install its own compatible Chrome — we just need the system libs
RUN apt-get update && apt-get install -y \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 \
    libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 libgbm1 \
    libpango-1.0-0 libcairo2 libasound2 libxshmfence1 \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    fonts-liberation \
    dumb-init \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

ENV NODE_ENV=production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies and puppeteer's compatible Chrome
RUN npm ci --only=production --ignore-scripts \
    && npx puppeteer browsers install chrome \
    && npm cache clean --force

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Copy email templates and other assets
COPY src/templates ./dist/templates

# Create non-root user for security
# Include puppeteer's Chrome cache (~/.cache/puppeteer) in ownership
RUN groupadd -r appuser && useradd -r -g appuser -m appuser \
    && chown -R appuser:appuser /app \
    && cp -r /root/.cache/puppeteer /home/appuser/.cache/puppeteer 2>/dev/null || true \
    && chown -R appuser:appuser /home/appuser/.cache

USER appuser

# Cloud Run uses PORT env var (defaults to 8080)
ENV PORT=8080
EXPOSE 8080

# Health check - uses PORT env var
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "const port = process.env.PORT || 8080; require('http').get('http://localhost:' + port + '/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "dist/index.js"]
