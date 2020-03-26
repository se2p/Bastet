#!/bin/sh

BASTET_VERSION=$(git rev-parse --short HEAD)
TAG="bastet:$BASTET_VERSION"

docker image build --pull --no-cache -f ./bastet.dockerfile --tag $TAG .

