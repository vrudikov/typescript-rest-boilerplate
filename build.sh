#!/usr/bin/env bash
npm run build
docker build -t typescript-rest-boilerplate .
#docker run typescript-rest-boilerplate:latest
