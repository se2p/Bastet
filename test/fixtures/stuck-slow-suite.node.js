'use strict';

const fs = require('fs');
const { spawn } = require('child_process');

const descendant = spawn(process.execPath, ['-e', 'process.on("SIGTERM", () => {}); setInterval(() => {}, 1000)'], {
    stdio: 'ignore',
});
fs.writeFileSync(process.env.BASTET_DESCENDANT_PID_PATH, String(descendant.pid));

Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0);
