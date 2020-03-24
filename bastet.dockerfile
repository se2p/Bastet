FROM node:13-alpine

# Set the working directory
# All subsequent actions will be taken from here
WORKDIR /bastet

# First, copy the package dependency definition only (for a better layering)
COPY package*.json ./

# Build BASTET
RUN npm install --production

# Install the global dependencies
RUN npm install -g typescript

# Copy BASTET fully into the image
COPY . ./

RUN npm run build-no-lint

CMD ["npm", "start"]
