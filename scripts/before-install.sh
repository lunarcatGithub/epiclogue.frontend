#!/bin/bash

if [ -d /home/ubuntu/epiclogue.frontend ]
then
    sudo rm -rf /home/ubuntu/epiclogue.frontend
fi
mkdir -p /home/ubuntu/epiclogue.frontend
cp -r /home/ubuntu/envs/epiclogue.ssl /home/ubuntu/epiclogue.frontend
cp /home/ubuntu/envs/.env* /home/ubuntu/epiclogue.frontend