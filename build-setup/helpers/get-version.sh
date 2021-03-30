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
regex='"version": "(v?[0-9]+\.[0-9]+\.[0-9]+)"'
[[ "$a" =~ $regex ]]

VERSION=${BASH_REMATCH[1]}

if [[ -z ${VERSION} ]]; then
  echo "No version found in ${FILE}"
	usage
	exit 1
fi

echo ${VERSION}