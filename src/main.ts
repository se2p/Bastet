#!/usr/bin/env node
'use strict';

import {Bastet} from "./bastet/Bastet";

new Bastet().run().catch((e) => {
    console.error("Running BASTET failed with " + e);
});
