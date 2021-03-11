#!/bin/bash

cd /home/ubuntu/build/out
sudo cp -r $(ls) /usr/share/nginx/html/
sudo service nginx reload
