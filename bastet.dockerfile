# Use the original nodejs image as parent image
FROM node:13 as build

# Set the working directory
# All subsequent actions will be taken from here
WORKDIR /bastet

FROM node:13-alpine

# First, copy the package dependency definition only (for a better layering)
COPY package.json .

# Build BASTET
RUN npm install

# Install the global dependencies
RUN npm install -g typescript

# Copy BASTET fully into the image
COPY . ./

RUN npm run build-no-lint

CMD ["npm", "start"]
