#!/bin/bash

rm -rf tmp/ # clear old files

wget "http://localhost:3030/film-today.json" --quiet --timeout 1 -O /dev/null
if [ $? -ne 0 ]
then
    echo "Service not available: run yarn dev first."
    exit 1
fi

wget --quiet localhost:3030/film-today.json --directory-prefix=tmp/
wget --quiet localhost:3030/film-today/text.json --directory-prefix=tmp/

wget --quiet localhost:3030/opinion.json --directory-prefix=tmp/
wget --quiet localhost:3030/opinion/text.json --directory-prefix=tmp/

aws s3 cp --profile=frontend --acl=public-read --recursive tmp/ s3://aws-frontend-emails-test/
