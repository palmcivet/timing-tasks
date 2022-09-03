# !/usr/bin/env bash

IMAGE_NAME="timing-tasks"
CURRENT_DIR=$(pwd)

docker build -t "$IMAGE_NAME" .
docker run -it -d -v "$CURRENT_DIR:/root/app" -v "$CURRENT_DIR/crontab:/var/spool/cron/crontabs/root" "$IMAGE_NAME" "chmod 777 /var/spool/cron/crontabs/root"
