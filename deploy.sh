#/bin/bash
aws s3 rm s3://protogest-dev --recursive
aws s3 cp ./dist s3://protogest-dev --recursive --acl public-read
aws cloudfront create-invalidation --distribution-id E2QPA1RFOFVOET --paths /*