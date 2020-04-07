#!/bin/sh

LAST_CHANGED=$(ls -at *.sc | head -n1)

./run-tests.sh $LAST_CHANGED

exit 0
