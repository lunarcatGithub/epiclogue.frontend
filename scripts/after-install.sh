#!/bin/bash

cd /home/ubuntu/epiclogue.frontend
# 도커 이미지 클린 셋업
docker-compose down
docker-compose up --build -d