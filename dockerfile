# Use an official Node.js runtime as a parent image
FROM nginx:1.21-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

## install cross-env
RUN npm install cross-env --save-dev

# Copy the rest of the application code to the container
COPY . .

# Disable CI strict mode
ENV CI=false

# Build the React app
RUN npm run build

# Use an nginx image to serve the built files
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
