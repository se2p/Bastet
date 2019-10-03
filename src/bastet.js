#!/usr/bin/env node
'use strict';

const fs = require('fs');
const parser = require('scratch-parser');
const VirtualMachine = require('scratch-vm');
const program = require('commander');

// Parsing of command line options
program.version('0.0.1')
    .option('-o, --option','option description')
    .option('-m, --more','we can have as many options as we want')
    .option('-i, --input [optional]','optional user input')
    .option('-I, --another-input <required>','required user input')
    .parse(process.argv);

// Parse the specification (a Scratch project)

// Parse Scratch program (a Scratch project)
var buffer = fs.readFileSync('test-inputs/sample.sb3');
parser(buffer, false, function (err, project) {
    if (err) {
        // handle the error 
    }
    // do something interesting
});

// Create the control-flow automata

// Create the program analysis and program analysis algorithms

// Run the program analysis

// Create and run the Scratch virtual machine
var vm = new VirtualMachine();
vm.start();
