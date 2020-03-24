FROM node:13 as build

WORKDIR /dist
COPY . ./

# Install the global dependencies
RUN npm install -g typescript

# Build bastet
RUN npm install; npm run build

FROM node:13-alpine

# Do not run the app as root
RUN groupadd -r nodejs && useradd -m -r -g -s /bin/bash nodejs nodejs

USER nodejs

COPY --from=build /app /

CMD ["npm", "start"]
