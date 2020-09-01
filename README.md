# BASTET Framework

*BASTET* is a program analysis and verification framework.
It is the first framework of its kind entirely built on Web technologies
such as NodeJs, TypeScript, and WebAssembly.

While *BASTET* was designed to analyze Scratch programs,
it actually operates on an *intermediate language*. **You** should
consider using *BASTET* as the foundation for your endeavors in context
of program analysis and verification if you are looking for a well-engineered
analysis framework entirely written in *TypeScript*.
You might also be interested in our bindings for the Z3 SMT solver we have
written for *BASTET*.

Currently, this framework implements:
- Abstract interpretation (including its lattice-theoretical foundations)
- Configurable program analysis (a variant of it)
- Model checking (of software)

*BASTET* is developed at the [Chair of Software Engineering II](https://www.fim.uni-passau.de/lehrstuhl-fuer-software-engineering-ii/)
of the [University of Passau](https://www.uni-passau.de).
See the list of [contributors](./CONTRIBUTORS.md) and `git shortlog -sne` for all people that contributed to this project.

### Development Environment

- NodeJs 14.x 
- TypeScript 4.x (npm install -g typescript)
- JetBrains WebStorm 2020.x

### Building BASTET

```
npm install
npm run build
```

### Running BASTET

We recommend using the `bastet.sh` wrapper script (can be started from a Unix shell):

```
./scripts/bastet.sh \
    --program test/programs/hello.sc \
    --specification test/programs/empty.sc \
    --intermediateLibrary src/public/library.sc
```

*BASTET* can also be executed from within a Docker container:

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

## LeILa

*BASTET* operates on *LeILa* programs (Learners Intermediate Language). 
Before a Scratch program can be analyzed by *BASTET*, both the given
program and the formal specification has to be translated to LeILa 
as the intermediate language for analysis. 
The grammar of *LeILa* is defined in the file [Leila.g4](src/bastet/syntax/parser/grammar/Leila.g4).

For now, the translation of *SCRATCH* programs to *LeiLa* is implemented
in the tool [LitterBox](https://github.com/se2p/LitterBox). *BASTET* uses
*LitterBox* as a library to conduct the translation. Invoking
`bastet.sh` with a `.sb3` Scratch project file leads
to an automatic translation to *LeILa*.

Note that also the formal specification of Scratch projects has to be
provided as *LeILA* a program—which then observes if the program under
analysis behaves correctly.
See the directory [ase20-verified](test/programs/publications/ase20-verified/) for
examples of Scratch programs along with their formal specification written
in *LeILa*.

## Scratch Block Library

The *BASTET* framework includes the [Scratch Block Library](src/public/library.sc).
Each block that can be visually composed in the Scratch IDE either has a counterpart
in the Scratch Block Library—in the form of a corresponding method—or 
corresponds to a construct of the language *LeILa* itself.

The Scratch Block Library is steadily growing and different implementations and 
approximations of the different Scratch blocks become available.
Please see the ASE'20 paper for more details on the approximations.
Note that the actual implementation of some Scratch blocks might 
still be missing: Check the completeness of their implementation before
conducting an analysis of Scratch projects.

## Publications and Citing

The *BASTET* framework was presented in our **ASE'20** paper with the 
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

## Funding

This work is supported by EPSRC project EP/N023978/2 and 
DFG project FR 2955/3-1 *“TENDER-BLOCK: Testing, Debugging, 
and Repairing Blocks-based Programs”*. 
