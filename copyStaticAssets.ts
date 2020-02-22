import * as shell from 'shelljs'

shell.cp('-R', 'src/public/', 'dist/');
shell.cp('-R', 'src/lib/', 'dist/');
