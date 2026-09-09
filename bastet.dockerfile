FROM node:24-alpine AS base

RUN apk add --no-cache bash
RUN corepack enable

# Set the working directory
# All subsequent actions will be taken from here
WORKDIR /bastet

FROM base AS deploy

# First, copy the package dependency definition only (for a better layering)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy BASTET fully into the image
COPY . ./

RUN pnpm run build-no-lint && pnpm prune --prod
