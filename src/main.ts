#!/usr/bin/env node
'use strict';

import {Bastet} from "./bastet/Bastet";

var bastet = new Bastet();
let analysisResult = bastet.runAnalysis();
