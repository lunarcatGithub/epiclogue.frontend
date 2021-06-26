#!/bin/bash

# 디렉토리 중복 오류 방지
if [ -d /home/ubuntu/epiclogue.frontend ]
then
    sudo rm -rf /home/ubuntu/epiclogue.frontend
fi
mkdir -p /home/ubuntu/epiclogue.frontend

# SSL 인증서 및 .env 파일 복사
cp -r /home/ubuntu/epiclogue.ssl /home/ubuntu/epiclogue.frontend
cp /home/ubuntu/envs/.env* /home/ubuntu/epiclogue.frontend