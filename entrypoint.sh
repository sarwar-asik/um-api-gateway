#!/bin/bash

yarn prisma:migrate
yarn prisma:generate
ts-node-dev --respawn --transpile-only src/server.ts