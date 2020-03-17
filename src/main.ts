#!/usr/bin/env node
'use strict';

import {Bastet} from "./bastet/Bastet";

new Bastet().run().then(() => process.exit(0)).catch((e) => {
    console.error("Running BASTET failed with: " + e.message);
    if (e.stack) {
        console.error(e.stack);
    }
});

