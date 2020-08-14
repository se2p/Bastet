#!/bin/bash

readonly LIB_DIR="./dist/lib"
readonly MY_TEMP_DIR=$(mktemp -d)

# Delete all temp files that
# were created by this script
function cleanup {
    rm -R $MY_TEMP_DIR
}

trap cleanup INT TERM HUP EXIT

# We store all temporary files in the same temporary
# folder that gets deleted after the script terminates.
tmp_counter=0
function tempfile {
    postfix="$1"
    tmp_counter=$((tmp_counter+1))
    echo "${MY_TEMP_DIR}/${tmp_counter}$postfix"
}

# Function to convert a given sb3-file to a file
# with a semantically equivalent program in our
# own textual programming language.
function convert_sb3_to_sc {
    sb3_file="$1"
    target_sc_file="$2"

    echo $sb3_file

    if [ -f $sb3_file ]
    then
        echo "Call litterbox to do convert a file"
        java -jar $LIB_DIR/litterbox/Litterbox.jar -p $sb3_file -u -n -o $target_sc_file
    else
        echo "No existing sb3 file given!"
        exit 1
    fi
}

# Rebuild the argument list by replacing
# all sb2-files by corresponding sc-files
# that have been created based on them.
arguments=()
for arg in "$@"
do
    argPrime=$arg
    if [[ $arg == *.sb3  ]]
    then
        if [ -f $arg ]
        then
            sc_file=$(tempfile ".sc")
            argPrime=$sc_file

            convert_sb3_to_sc "$arg" "$sc_file"
            unzip $arg -d $MY_TEMP_DIR
        else
            echo "WARNING: The given sb3-file does not exist!"
            exit 1
        fi
    fi
    arguments+=$argPrime
    arguments+=" "
done

# Script to run Bastet in UNIX environments
echo "${arguments[*]}"
exec node --max-old-space-size=10240 dist/src/main.js ${arguments[*]}

# Cleanup (is triggered automatically on EXIT---a trap is used)
exit 0

