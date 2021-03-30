#!/usr/bin/env bash

function usage()
{
	bold=$(tput bold)
	normal=$(tput sgr0)
	echo "NAME"
	echo "    get-version.sh - Get version from json file"
	echo "SYNOPSIS"
	echo "    ${bold}get-version.sh${normal} ${bold}version"
}

FILE=$1
if [[ -z ${FILE} ]]; then
	usage
	exit 1
fi

a=`cat ${FILE}`
regex='"name": "([A-Za-z0-9\-]+)"'
[[ "$a" =~ $regex ]]

NAME=${BASH_REMATCH[1]}

if [[ -z ${NAME} ]]; then
  echo "No name found in ${FILE}"
	usage
	exit 1
fi

echo ${NAME}