#!/usr/bin/env bash

license-checker --production --json --out scripts/licenses/license_checker.json

node scripts/licenses/read-js-licenses.js
