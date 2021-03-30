#!/usr/bin/env bash

function usage() {
  bold=$(tput bold)
  normal=$(tput sgr0)
  echo "NAME"
  echo "    build-web.sh - Release taurus-trade-gui-backoffice-client for Web"
  echo "SYNOPSIS"
  echo "    ${bold}build-mac.sh${normal}"
}

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

VERSION=$(./build-setup/helpers/get-version.sh package.json)

if [[ -z ${VERSION} ]]; then
  usage
  exit 1
fi

PROJECT_NAME=$(./build-setup/helpers/get-name.sh package.json)

if [[ -z ${PROJECT_NAME} ]]; then
  usage
  exit 1
fi

CLIENT_WEB_PATH=${PROJECT_NAME}-client-web-${VERSION}

echo "---------- clean ----------"
yarn run clean

echo "----------yarn run build ----------"
yarn run build:web

echo "----------prepare output folder ----------"
mkdir -p out/${CLIENT_WEB_PATH}

echo "---------- tranfert files ----------"
cp -r dist/web/* out/${CLIENT_WEB_PATH}

echo "---------- zipping ----------"
cd out/${CLIENT_WEB_PATH}
zip -r ../${CLIENT_WEB_PATH}.zip *
cd ../..

echo "---------- finish ----------"
ls -hl out/
