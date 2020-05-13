#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

PROGRAM="$1"
MAX_MSECS="$2"

# Root directory of BASTET
cd $SCRIPT_DIR/..

git bisect run $SCRIPT_DIR/bisect-eval-script.sh $PROGRAM $MAX_MSECS

