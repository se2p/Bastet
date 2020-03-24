# Use the original nodejs image as parent image
FROM node:13 as build

# Install the global dependencies
RUN npm install -g typescript

# Set the working directory
WORKDIR /bastet

# First, copy the package dependency definition only (for a better layering)
COPY package.json .

# Build BASTET
RUN npm install; npm run build

FROM node:13-alpine

# Do not run the app as root
RUN groupadd -r nodejs && useradd -m -r -g -s /bin/bash nodejs nodejs

USER nodejs

# Copy BASTET fully into the image
COPY . ./

CMD ["npm", "start"]
