# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the app for production
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Serve the app on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]

# Make port 3000 available to the outside
EXPOSE 3000
