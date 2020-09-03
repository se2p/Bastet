#!/bin/sh

BASTET_VERSION=$(git rev-parse --short HEAD)
TAG="bastet:$BASTET_VERSION"
DOCKER_TAR="bastet-docker-$BASTET_VERSION.tar"
SCRIPT=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT")
INPUT_DIR=$SCRIPT_DIR
OUTPUT_DIR="$SCRIPT_DIR/output/"
mkdir -p $OUTPUT_DIR

source ./docker.sh.inc

if [ ! -f $DOCKER_TAR ]
then
	./docker-build.sh
fi

# Load the docker image
$DOCKERCMD load -i $DOCKER_TAR

# Run the image
$DOCKERCMD run \
     --mount type=bind,source=${INPUT_DIR},target=/input \
     --mount type=bind,source=${OUTPUT_DIR},target=/output \
     $TAG \
     /bin/bash ./scripts/bastet.sh "$@"

