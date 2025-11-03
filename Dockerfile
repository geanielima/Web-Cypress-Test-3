# Use the official Cypress included image with Node.js and browsers
FROM cypress/included:13.7.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables for Cypress (optional)
ENV CYPRESS_baseUrl=https://the-internet.herokuapp.com

# Run Cypress tests in headless mode
CMD ["npm", "run", "test"]