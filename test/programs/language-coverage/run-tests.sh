#!/bin/bash

TEST_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
BASTET_ROOT="../../../"

cd $BASTET_ROOT

for f in $(find $TEST_DIR -name "*.sc") 
do
    echo $f
     ./scripts/bastet.sh -P $f -S test/programs/empty.sc -I src/public/intermediate.sc
done
