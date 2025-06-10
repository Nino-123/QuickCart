# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Build Next.js app
RUN printenv
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

ARG NEXT_PUBLIC_CURRENCY
ENV NEXT_PUBLIC_CURRENCY=$NEXT_PUBLIC_CURRENCY

RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]