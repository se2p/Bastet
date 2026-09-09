#!/usr/bin/env node
'use strict';

import { Bastet } from './bastet/Bastet';

/** Code for successful process exit. */
const EXIT_SUCCESS = 0;

/** Code for process execution with failure. */
const EXIT_FAILURE = 1;

/**
 * BASTET's main entry point.
 */
new Bastet()
    .run()
    .then(() => process.exit(EXIT_SUCCESS))
    .catch((e) => {
        console.group('Running BASTET failed with: ' + e.message);
        try {
            if (e.stack) {
                console.error(e.stack);
            }
        } finally {
            console.groupEnd();
        }

        // The following exit is needed to ensure that Bastet really terminates.
        process.exit(EXIT_FAILURE);
    });
