#!/bin/bash

BASTET_VERSION=$(git rev-parse --short HEAD)
TAG="bastet:$BASTET_VERSION"

source ./docker.sh.inc

# Build the docker image
$DOCKERCMD image build --pull --no-cache -f ./bastet.dockerfile --tag $TAG .

# Export the docker image to a tar.bz2 file
$DOCKERCMD save $TAG -o bastet-docker-$BASTET_VERSION.tar
