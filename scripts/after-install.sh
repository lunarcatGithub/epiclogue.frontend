#!/bin/bash

cd /home/ubuntu/epiclogue.frontend
rm -rf node_modules
npm install
# 도커 이미지 클린 셋업
docker-compose down
docker-compose up --build -d