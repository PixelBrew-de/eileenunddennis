# --------- BUILD STAGE ---------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build frontend (Vite) and backend (esbuild)
RUN npm run build

# --------- RUNTIME STAGE ---------
FROM node:20-alpine

WORKDIR /app

# Copy only what is needed to run the app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Create a non-root user
RUN addgroup -g 1001 -S nodejs \
  && adduser -S appuser -u 1001 \
  && chown -R appuser:nodejs /app

USER appuser

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# Healthcheck to verify app is up
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --spider -q http://localhost:5000/health || exit 1

# Start the backend (your dist/index.js)
CMD ["node", "dist/index.js"]
