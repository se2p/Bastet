#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

PROGRAM="$1"
MAX_MSECS="$2"

cd $BASTET_ROOT

RESULT_FILE=$(mktemp)

grep_statistic () {
    CONTEXT="$1"
    IDENT="$2"
    cat $RESULT_FILE | grep $CONTEXT -A 5 | grep "$IDENT" | cut -d":" -f2 | cut -d"," -f1
}

npm install
if ! npm run build-no-lint
then
    exit 125
fi

./scripts/bastet.sh \
    -c config/default.json,config/benchmarking.delta.json \
    -I src/public/library.sc \
    -P $PROGRAM \
    -S test/programs/empty.sc \
    > $RESULT_FILE 2>&1

DURATION=$(grep_statistic "MultiPropertyAlgorithm" "duration" | cut -d"." -f1)

rm $RESULT_FILE

if [ "$DURATION" -gt "$MAX_MSECS" ]
then 
    echo "Bug identified!"
    exit 1
else
    echo "Seems fine."
    exit 0
fi


