#!/bin/sh

BASTET_VERSION=$(git rev-parse --short HEAD)

docker image build -f ./bastet.dockerfile -t bastet:$BASTE_VERSION .

