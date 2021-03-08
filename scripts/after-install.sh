#!/bin/bash

cd /home/ubuntu/build/build
sudo cp -r $(ls) /usr/share/nginx/html/
sudo service nginx reload
