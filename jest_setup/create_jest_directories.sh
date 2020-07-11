#!/bin/sh

SCRIPT_DIRECTORY=`pwd`
cd ..
ROOT_DIRECTORY=`pwd`
all_directories_file="${SCRIPT_DIRECTORY}/allDirectories.txt"
jest_basic_file="${SCRIPT_DIRECTORY}/index.jestSample.ts"
mapfile -t list_of_directories < $all_directories_file

while read dir; do
    full_path="${ROOT_DIRECTORY}${dir}/__tests__"
    if [ ! -e $full_path ]
    then
	mkdir $full_path
    fi
    
    index_jest="${full_path}/index.ts"

    if [ ! -e $index_jest ]
    then
	cp $jest_basic_file $index_jest
    fi    
done < $all_directories_file


