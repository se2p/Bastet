#!/bin/bash


if command -v docker-rootless-infosun &> /dev/null
then
    export DOCKERCMD="docker-rootless-infosun --data-root /local/$USER/docker -- "
else
    if command -v docker &> /dev/null
    then 
        export DOCKERCMD="docker "
    else
        echo "Docker not installed? Please make Docker available first."
        exit 1
    fi
fi

