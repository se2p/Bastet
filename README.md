# Bastet Framework

*Bastet* is a framework for the analysis and verification of Scratch programs.

Scratch programs run higly **concurrent** (Green threads) and can be distributed 
among different machines. **Communication among processes** is implemented both based 
on message passing but also based on shared memory. Since message passing can
be implemented based on shared memory and vice versa we could stick
to one paradigm only. Nevertheless, *Bastet* should (in the long run) support
to transform a program (for analysis) to do either a purely shared-memory
based approach, a purely message-passing based approach, or an hybrid approach.

Typically, Scratch programs make heavily usage of **timers** to control program exeuction.
That is, to specify Scratch programs a specification langauge with some notion
of time should be prefered. We operationalize all given speficications as 
Scratch programs. 

This framework implements:
- Abstract interpretation (including its lattice-theoretical foundations)
- Configurable program analysis (a variant of it)
- Model checking (of software)
- Counterexample-guided abstraction refinement (CEGAR)
- Craig interpolation (in a first step for an interval analysis)

## Publications and Citing

The foundations for this work were developed in our FSE'19 paper on "Testing
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

## Development Environment

- IDE: JetBrains WebStorm 2019.x
- NodeJs 10.16 (LTS)
- TypeScript 3.6 (npm install -g typescript)
- UMLet UML Editor 14.3
