#!/bin/bash

# 디렉토리로 이동 후 패키지 재인스톨
cd /home/ubuntu/epiclogue.frontend
rm -rf node_modules/
yarn install

# 도커 이미지 클린 셋업
docker-compose down
docker-compose up --build -d