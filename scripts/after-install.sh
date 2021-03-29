#!/bin/bash

cd /home/ubuntu/epiclogue.frontend
rm -rf node_modules
yarn install
# 도커 이미지 클린 셋업
docker-compose stop
docker container rm -f $(docker ps -aq)
docker-compose up --build -d
  