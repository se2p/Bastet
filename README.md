# BASTET Framework

*BASTET* is a framework for the analysis and verification of *SCRATCH* programs.

*SCRATCH* programs run highly **concurrent** (Green threads) and can be distributed 
among different machines. **Communication among processes** is implemented both based 
on message passing but also based on shared memory. Since message passing can
be implemented based on shared memory and vice versa we could stick
to one paradigm only. Nevertheless, *BASTET* should (in the long run) support
to transform a program (for analysis) to do either a purely shared-memory
based approach, a purely message-passing based approach, or an hybrid approach.

Typically, *SCRATCH* programs make heavily usage of **timers** to control program execution.
That is, to specify *SCRATCH* programs a specification language with some notion
of time should be preferred. We operationalize all given specifications as 
*SCRATCH* programs. 

Currently, this framework implements:
- Abstract interpretation (including its lattice-theoretical foundations)
- Configurable program analysis (a variant of it)
- Model checking (of software)
- Bounded Model Checking

Upcoming versions will support:
- Counterexample-guided abstraction refinement (CEGAR)
- Craig interpolation


### Development Environment

- IDE: JetBrains WebStorm 2020.x
- NodeJs 14.2 (Current)
- TypeScript 3.9 (npm install -g typescript)
- UMLet UML Editor 14.3


### Building BASTET

```
npm install
npm build
```

### Running BASTET

We recommend to use the `bastet.sh` wrapper script (can be started from an Unix shell):

```
./scripts/bastet.sh \
    --program test/programs/mini1program.sc \
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

The BASTET framework was presented in our ASE'20 paper with the 
title "Verified from Scratch: Program Analysis for Learners’ Programs":

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

Some foundations for this work were developed in our FSE'19 paper on "Testing
Scratch Programs Automatically":

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
