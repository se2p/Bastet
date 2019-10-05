# Basted Framework

Bastet is a framework for the analysis and verification of Scratch programs.

Scratch programs run higly concurrent (Green threads) and can be distributed 
among different machines. Communication among processes is implemented both based 
on message passing but also based on shared memory. Since message passing can
be implemented based on shared memory and vice versa we could stick
to one paradigm only. Nevertheless, Bastet should (in the long run) support
to transform a program (for analysis) to do either a prurely shared-memory
based approach, a purely message-passing based approach, or an hybrid approach.

This framework implements:
- Abstract interpretation (including its lattice-theoretical foundations)
- Configurable program analysis (a variant of it)
- Model checking (of software)
- Counterexample-guided abstraction refinement (CEGAR)
- Craig interpolation (in a first step for an interval analysis)

## Development Environment

- IDE: JetBrains WebStorm 2019.x
- NodeJs 10.16 (LTS)
- UMLet UML Editor 14.3
