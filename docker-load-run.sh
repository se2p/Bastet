#!/bin/sh

BASTET_VERSION=$(git rev-parse --short HEAD)
TAG="bastet:$BASTET_VERSION"
DOCKER_TAR="bastet-docker-$BASTET_VERSION.tar"
INPUT_DIR="./"
OUTPUT_DIR="./output/"

if [ ! -f $DOCKER_TAR ]
then
	./docker-build.sh
fi

# Load the docker image
dockerd-rootless-infosun --data-root /local/$USER/docker -- \
    docker load -i $DOCKER_TAR

# Run the image
dockerd-rootless-infosun --data-root /local/$USER/docker -- \
    docker run \
        --mount type=bind,source=${INPUT_DIR},target=/input \
        --mount type=bind,source=${OUTPUT_DIR},target=/output \
        $TAG \
        /bin/bash ./scripts/bastet.sh

