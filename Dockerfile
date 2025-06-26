# Build stage
FROM node:18-alpine AS build-stage

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
COPY .env.production .env.production
RUN npm run build

# Production stage - serve with nginx
FROM nginx:alpine AS production-stage

# Copy built app
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Use custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]