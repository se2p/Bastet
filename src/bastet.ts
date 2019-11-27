#!/usr/bin/env node
'use strict'

const commander = require('commander')
const VirtualMachine = require('scratch-vm')

export class Bastet {
    public run() {
        // Parsing of command line options
        const program = new commander.Command()
        program
            .version('0.0.1')
            .option('-o, --option', 'option description')
            .option('-m, --more', 'we can have as many options as we want')
            .option('-i, --input [optional]', 'optional user input')
            .option('-I, --another-input <required>', 'required user input')
            .parse(process.argv)

        // Parse the specification (a Scratch project)

        // Parse Scratch program (a Scratch project)
        // var buffer = fs.readFileSync('test-inputs/sample.sb3');

        // Create the control-flow automata

        // Create the program analysis and program analysis algorithms

        // Run the program analysis

        // Create and run the Scratch virtual machine
        var vm = new VirtualMachine()
        vm.start()
    }
}

var bastet = new Bastet()
bastet.run()
