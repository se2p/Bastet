# On Running BASTET in Docker

The docker image is defined by `bastet.dockerfile`

## Building the Docker image

Run `./docker-build.sh`

Should terminate with `Successfully tagged bastet:68d1728`
where `68d1728` is the current version of the Git repository.

## Running the Docker image

Run `docker run bastet:68d1728 /bin/bash scripts/bastet.sh`


