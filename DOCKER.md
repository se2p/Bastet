# On Running BASTET in Docker

The docker image is defined by `bastet.dockerfile`

## Building the Docker Image

Run `./docker-build.sh`

Should terminate with `Successfully tagged bastet:68d1728`
where `68d1728` is the current version of the Git repository.

## Running the Docker Image

Run 

```
docker run \
    bastet:68d1728 \
    --mount type=bind,source=${INPUT_DIR},target=/input \
    --mount type=bind,source=${OUTPUT_DIR},target=/bastet/output \
    /bin/bash scripts/bastet.sh
```

## Saving the Docker Image to a File

`docker save -o bastet-docker.tar bastet:68d1728`

or `docker save bastet:68d1728 | bzip2 > bastet-docker.tar.bz2`

## Loading a Docker Image from a File

`docker load -i bastet-docker.tar`

or `bunzip2 bastet-docker.tar.bz | docker load` 

