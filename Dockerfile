FROM node:lts-alpine AS builder
# Install git if it's not already present in the base image
RUN apk add --no-cache git
WORKDIR /app
# Clone the GitHub repository
# Replace <your-username> and <your-repository> with your actual GitHub details
RUN git clone -b manual https://github.com/SpaghetGaming/Spaghet.io.git  .

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve the static files with a lightweight web server
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]