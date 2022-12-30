#!/bin/bash
npm install
cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
npm run start -- --host 0.0.0.0