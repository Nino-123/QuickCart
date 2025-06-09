# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZW5hYmxpbmctc2hlZXAtNDQuY2xlcmsuYWNjb3VudHMuZGV2JA

# Build Next.js app
RUN printenv
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]