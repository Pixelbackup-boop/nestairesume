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

# Install ALL Chrome dependencies (complete list from puppeteer docs)
# Plus fonts for international support and openssl for Prisma
RUN apt-get update && apt-get install -y \
    ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libdrm2 \
    libexpat1 libfontconfig1 libgbm1 libgcc-s1 libglib2.0-0 \
    libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 \
    libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 \
    libxrender1 libxshmfence1 libxss1 libxtst6 lsb-release \
    xdg-utils wget \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg \
    fonts-kacst fonts-freefont-ttf fonts-liberation \
    openssl dumb-init \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Store puppeteer's Chrome inside /app so it's covered by the appuser chown
ENV NODE_ENV=production
ENV PUPPETEER_CACHE_DIR=/app/.cache/puppeteer

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
# Chrome is in /app/.cache/puppeteer — covered by the /app chown
RUN groupadd -r appuser && useradd -r -g appuser appuser \
    && chown -R appuser:appuser /app

USER appuser

# Cloud Run uses PORT env var (defaults to 8080)
ENV PORT=8080
EXPOSE 8080

# Health check - uses PORT env var
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "const port = process.env.PORT || 8080; require('http').get('http://localhost:' + port + '/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Run migrations then start application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
