#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

PROGRAM="$1"
MAX_MSECS="$2"

# Root directory of BASTET
cd $SCRIPT_DIR/..

export BASTET_ROOT=`pwd`
TMP_EVAL_SCRIPT=$(mktemp)
cp $SCRIPT_DIR/bisect-eval-script.sh $TMP_EVAL_SCRIPT

git bisect run $TMP_EVAL_SCRIPT $PROGRAM $MAX_MSECS

