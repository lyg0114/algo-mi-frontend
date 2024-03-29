#!/bin/bash

IMAGE_NAME="algo-me-front"
TAG_VERSION="latest-v4" # should change version info

yarn install
yarn build

docker build -t ${IMAGE_NAME} .
docker tag ${IMAGE_NAME}:latest whdnseowkd/${IMAGE_NAME}:${TAG_VERSION}
docker run -p 8080:80 ${IMAGE_NAME}


