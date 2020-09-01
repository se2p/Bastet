# BASTET Framework

*BASTET* is a framework for the analysis and verification of *SCRATCH* programs.

Currently, this framework implements:
- Abstract interpretation (including its lattice-theoretical foundations)
- Configurable program analysis (a variant of it)
- Model checking (of software)

Upcoming versions will support:
- Counterexample-guided abstraction refinement (CEGAR)
- Predicate abstraction

*BASTET* is developed at the [Chair of Software Engineering II](https://www.fim.uni-passau.de/lehrstuhl-fuer-software-engineering-ii/)
of the [University of Passau](https://www.uni-passau.de).

### Development Environment

- NodeJs 14.x 
- TypeScript 4.x (npm install -g typescript)
- JetBrains WebStorm 2020.x

### Building BASTET

```
npm install
npm build
```

### Running BASTET

We recommend to use the `bastet.sh` wrapper script (can be started from an Unix shell):

```
./scripts/bastet.sh \
    --program test/programs/hello.sc \
    --specification test/programs/empty.sc \
    --intermediateLibrary src/public/library.sc
```

BASTET can also be executed from within a Docker container:

```
  docker run \
    --mount type=bind,source=${INPUT_DIR},target=/input \
    --mount type=bind,source=${OUTPUT_DIR},target=/output \
    bastet:9a9e226 \
    /bin/bash ./scripts/bastet.sh
```
where `bastet:9a9e226` is the identifier of the Docker image 
that was loaded to Docker.

See the files [docker-build.sh](./docker-build.sh) and
[docker-load-run.sh](./docker-load-run.sh) for more details.

## Publications and Citing

The BASTET framework was presented in our **ASE'20** paper with the 
title *"Verified from Scratch: Program Analysis for Learners’ Programs"*:

```
@inproceedings{VerifiedFromScratch,
  author    = {Andreas Stahlbauer and
               Christoph Frädrich and
               Gordon Fraser},
  title     = {Verified from Scratch: Program Analysis for Learners’ Programs},
  booktitle = {{ASE}},
  publisher = {{IEEE}},
  year      = {2020}
}

```

Some foundations for this work were developed in our **FSE'19** paper on *"Testing
Scratch Programs Automatically"*:

```
@inproceedings{TestingScratchPrograms,
  author    = {Andreas Stahlbauer and
               Marvin Kreis and
               Gordon Fraser},
  title     = {Testing Scratch Programs Automatically},
  booktitle = {{ESEC/SIGSOFT} {FSE}},
  pages     = {165--175},
  publisher = {{ACM}},
  year      = {2019}
}
```
