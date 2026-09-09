# BASTET Framework

_BASTET_ is a program analysis and verification framework.
It is the first framework of its kind entirely built on Web technologies
such as NodeJs, TypeScript, and WebAssembly.

While _BASTET_ was designed to analyze Scratch programs,
it actually operates on an _intermediate language_. You should
consider using _BASTET_ as the foundation for your endeavors in context
of program analysis and verification if you are looking for a well-engineered
analysis framework entirely written in _TypeScript_.
You might also be interested in our bindings for the Z3 SMT solver
written for _BASTET_.

Currently, this framework implements:

- Abstract interpretation (including its lattice-theoretical foundations)
- Configurable program analysis (a variant of it)
- Model checking (of software)

_BASTET_ is developed at the [Chair of Software Engineering II](https://www.fim.uni-passau.de/lehrstuhl-fuer-software-engineering-ii/)
of the [University of Passau](https://www.uni-passau.de).
See the list of [contributors](./CONTRIBUTORS.md) and `git shortlog -sne` for all people that contributed to this project.

### Development Environment

- Node.js 24.x
- pnpm 11.x (provided through Corepack)
- TypeScript 5.x (installed with the project dependencies)
- JetBrains WebStorm 2020.x

### Building BASTET

```
corepack enable
pnpm install --frozen-lockfile
pnpm run build
```

### Running BASTET

We recommend using the `bastet.sh` wrapper script (can be started from a Unix shell):

```
./scripts/bastet.sh \
    --program test/programs/hello.sc \
    --specification test/programs/empty.sc \
    --intermediateLibrary src/public/library.sc
```

_BASTET_ can also be executed from within a Docker container:

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

_BASTET_ operates on _LeILa_ programs (Learners' Intermediate Language).
Before a Scratch program can be analyzed by _BASTET_, both the given
program and the formal specification have to be translated to LeILa
as the intermediate language for analysis.
The grammar of _LeILa_ is defined in the file [Leila.g4](src/bastet/syntax/parser/grammar/Leila.g4).

For now, the translation of _SCRATCH_ programs to _LeiLa_ is implemented
in the tool [LitterBox](https://github.com/se2p/LitterBox). _BASTET_ uses
_LitterBox_ as a library to conduct the translation. Invoking
`bastet.sh` with a `.sb3` Scratch project file leads
to an automatic translation to _LeILa_.

Note that the formal specification of Scratch projects also has to be
provided as a _LeILa_ program—which then observes if the program under
analysis behaves correctly.
See the directory [ase20-verified](test/programs/publications/ase20-verified/) for
examples of Scratch programs along with their formal specifications written
in _LeILa_.

## Scratch Block Library

The _BASTET_ framework includes the [Scratch Block Library](src/public/library.sc).
Each block that can be visually composed in the Scratch IDE either has a counterpart
in the Scratch Block Library—in the form of a corresponding method—or
corresponds to a construct of the language _LeILa_ itself.

The Scratch Block Library is steadily growing and different implementations and
approximations of the different Scratch blocks become available.
Please see the ASE'20 paper for more details on the approximations.
Note that the actual implementation of some Scratch blocks might
still be missing: Check the completeness of their implementation before
conducting an analysis of Scratch projects.

## Publications and Citing

The _BASTET_ framework was presented in our **ASE'20** paper with the
title _"Verified from Scratch: Program Analysis for Learners’ Programs"_:

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

Some foundations for this work were developed in our **FSE'19** paper on _"Testing
Scratch Programs Automatically"_:

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
DFG project FR 2955/3-1 _“TENDER-BLOCK: Testing, Debugging,
and Repairing Blocks-based Programs”_.
