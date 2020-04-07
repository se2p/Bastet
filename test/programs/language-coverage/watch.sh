#!/bin/sh

export BASTET_NO_BUILD=1

fswatch ./ | ./run-last-changed.sh
