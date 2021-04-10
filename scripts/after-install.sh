#!/bin/bash

cd /home/ubuntu/epiclogue.frontend
sudo rm -rf node_modules
yarn
# 도커 이미지 클린 셋업
docker-compose down
docker-compose up --build -d