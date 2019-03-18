#/bin/bash

aws s3 cp ./dist s3://protogest-frontend-2019 --recursive --acl public-read