# Stage 1: Clone the repository and build the Astro project
FROM node:lts-alpine AS build
WORKDIR /app

# Install git and clone the repository
RUN apk add --no-cache git
ARG REPO_URL
RUN git clone $REPO_URL .

# Install dependencies and build the project
RUN npm install
RUN npm run build

# Stage 2: Serve the built application with a lightweight runtime image
FROM node:lts-alpine AS runtime
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .

# Set environment variables for the server
ENV HOST=0.0.0.0
ENV PORT=4321

# Expose the port the Astro app runs on
EXPOSE 4321

# Command to run the application
CMD ["node", "./dist/server/entry.mjs"]