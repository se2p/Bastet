/*
 *   BASTET Program Analysis and Verification Framework
 *
 *   Copyright 2019 by University of Passau (uni-passau.de)
 *
 *   Maintained by Andreas Stahlbauer (firstname@lastname.net),
 *   see the file CONTRIBUTORS.md for the list of contributors.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

var Module = {
  preRun: [],
  postRun: function() {
  },
  print: (function() {
    return function(text) {
      console.log(text);
    };
  })(),
  printErr: function(text) {
    console.error(text);
  },
  canvas: (function() {
    return null;
  })(),
  setStatus: function(text) {
    console.log('Status: ', text)
  },
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
  },
};
Module.setStatus('Downloading...');
window.onerror = function(event) {
  Module.setStatus('Exception thrown, see JavaScript console');
  Module.setStatus = function(text) {
    if (text) Module.printErr('[post-exception status] ' + text);
  };
};
requirejs.config({
  paths: {
    "test": "test",
    "../ctypes": "ts/ctypes",
    "ctypes": "ts/ctypes",
    "../libz3": "ts/libz3",
    "libz3": "ts/libz3",
    "util": "ts/util",
    "../util": "ts/util",
    "wasmInstance": "ts/wasmInstance",
    "libz3.so": "libz3.so",
    "test_parse": "ts/tests/test_parse","test_simple_contradiction": "ts/tests/test_simple_contradiction","test_simple_contradiction_string_sym": "ts/tests/test_simple_contradiction_string_sym",
  },
  shim: {
    'libz3.so': {
    },
  },
  waitSeconds: 0,
});
requirejs(
  [
    "libz3.so",
    "test_parse","test_simple_contradiction","test_simple_contradiction_string_sym",
  ],
  () => {
 console.log("Loaded...");
      var statusElement = document.getElementById('status');
      var progressElement = document.getElementById('progress');
  }
);
