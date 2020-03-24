#!/bin/sh

BASTET_VERSION=$(git rev-parse --short HEAD)
TAG="bastet:$BASTET_VERSION"

docker image build --no-cache -f ./bastet.dockerfile -t $TAG .

