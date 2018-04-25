#!/bin/sh

# yarn global add concurrently

concurrently -k -p "[{name}]" \
  -n "lib-ts,api-ts,api-node,front" \
  -c "cyan.bold,green.bold,magenta.bold,yellow.bold" \
  "cd lib && yarn run watch-ts" \
  "cd api && yarn run watch-ts" \
  "cd api && yarn run watch-node" \
  "cd front && yarn run start"
