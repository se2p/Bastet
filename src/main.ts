#!/usr/bin/env node
'use strict';

import {Bastet} from "./bastet/Bastet";

new Bastet().run().then(() => process.exit(0)).catch((e) => {
    console.group("Running BASTET failed with: " + e.message);
    try {
        if (e.stack) {
            console.error(e.stack);
        }
    } finally {
        console.groupEnd();
    }
});

