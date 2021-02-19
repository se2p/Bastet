#!/bin/bash

NAME_PREFIX="$1"

TEST_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
BASTET_ROOT="../../../"

ctrl_c () {
    exit 1
}

trap ctrl_c INT

echo "FILTER: $NAME_PREFIX"

cd $BASTET_ROOT

mkdir -p "output/test-results/"

if [ -z $BASTET_NO_BUILD ]
then
    npm run build
fi

grep_statistic () {
    CONTEXT="$1"
    IDENT="$2"
    cat $RESULT_FILE | grep $CONTEXT -A 5 | grep "$IDENT" | cut -d":" -f2 | cut -d"," -f1
}

grep_error () {
    cat $RESULT_FILE | egrep "Failed to verify:|Running BASTET failed with:" | cut -d":" -f2
}

num_or_zero () {
    VALUE=$1
    if [[ $VALUE =~ ^-?[0-9]+$ ]]
    then
        echo $VALUE
    else
        echo "0"
    fi
}

parse_results () {
    INPUT_FILE="$1"
    RESULT_FILE="$2"
    SATISFIED=$(num_or_zero `grep_statistic "MultiPropertyAlgorithm" "num_satisfied"`)
    VIOLATED=$(num_or_zero `grep_statistic "MultiPropertyAlgorithm" "num_violated"`)
    DURATION=$(grep_statistic "MultiPropertyAlgorithm" "duration")
    REACHED=$(grep_statistic "ReachabilityAlgorithm" "reachedStates")
    ERROR=$(grep_error)
    DURATION=$(printf '%.*f\n' 2 $DURATION)

    if [[ $INPUT_FILE == *_SAFE.sc ]]
    then
        EXPECTED_VIOLATED="0"
        EXPECTED_SATISFIED="1"
    else
        EXPECTED_VIOLATED="1"
        EXPECTED_SATISFIED="0"
    fi

    OK=1
    if [ ! $EXPECTED_VIOLATED -eq "$VIOLATED" ]
    then
        OK=0
    fi

    if [ ! "$SATISFIED" -ge $EXPECTED_SATISFIED ]
    then
        OK=0
    fi

    printf "\t$DURATION\t$REACHED\t$VIOLATED\t$SATISFIED"

    if [ ! -z "$ERROR" ]
    then
            printf "\tERROR\t$ERROR"
    else
        if [ $OK -eq 1 ]
        then
            printf "\tOK"
        else
            printf "\tBUG"
            cp $RESULT_FILE "output/test-results/$(basename $INPUT_FILE).bug.log"
        fi
    fi
}

for f in $(find $TEST_DIR -name "*${NAME_PREFIX}*" -and -name "*.sc" | sort)
do
    RESULT_FILE=$(mktemp)
    printf "`basename $f`"
     timeout 300 ./scripts/bastet.sh \
        -c config/default.json,config/benchmarking.delta.json \
        -P $f \
        -S test/programs/empty.sc \
        -I src/public/library.sc \
        > $RESULT_FILE 2>&1
    parse_results $f $RESULT_FILE
    rm $RESULT_FILE
    printf "\n"
done
