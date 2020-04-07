#!/bin/sh

BASTET_VERSION=$(git rev-parse --short HEAD)
TAG="bastet:$BASTET_VERSION"

# Build the docker image
dockerd-rootless-infosun --data-root /local/$USER/docker -- \
    docker image build --pull --no-cache -f ./bastet.dockerfile --tag $TAG .

# Export the docker image to a tar.bz2 file
dockerd-rootless-infosun --data-root /local/$USER/docker -- \
    docker save $TAG | bzip2 > bastet-docker-$BASTET_VERSION.tar.bz2
