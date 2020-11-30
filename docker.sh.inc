#!/bin/bash

if ! groups "$USER" | grep -q '\bdocker\b'; then
    echo "User must be in the group 'docker'"
    exit 1
fi

if command -v dockerd-rootless-infosun &> /dev/null
then
    export DOCKERCMD="dockerd-rootless-infosun --data-root /local/$USER/docker -- "
else
    if command -v docker &> /dev/null
    then 
        export DOCKERCMD="docker "
    else
        echo "Docker not installed? Please make Docker available first."
        exit 1
    fi
fi

