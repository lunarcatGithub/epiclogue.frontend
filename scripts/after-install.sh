#!/bin/bash

cd /home/ubuntu/epiclogue.frontend
# 도커 이미지 클린 셋업
docker-compose stop
docker container rm $(docker ps -aq)
docker-compose up --build -d
  