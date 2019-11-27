#!/bin/bash

rm -rf tmp/ # clear old files

wget "http://localhost:3030/film-today.json" --quiet --timeout 1 -O /dev/null
if [ $? -ne 0 ]
then
    echo "Service not available: run yarn dev first."
    exit 1
fi

wget --quiet localhost:3030/film-today.json --directory-prefix=tmp/film/
wget --quiet localhost:3030/film-today/text.json --directory-prefix=tmp/film/

wget --quiet localhost:3030/film-today.json?variant=b --directory-prefix=tmp/film-b/

wget --quiet localhost:3030/opinion/text.json --directory-prefix=tmp/opinion-b/
wget --quiet localhost:3030/opinion.json --directory-prefix=tmp/opinion-b/
wget --quiet localhost:3030/opinion.json?variant=c --directory-prefix=tmp/opinion-c/

mv ./tmp/opinion-c/opinion.json?variant=c ./tmp/opinion-c/opinion.json

mv ./tmp/film-b/film-today.json?variant=b ./tmp/film-b/film-today.json

aws s3 cp --profile=frontend --acl=public-read --recursive tmp/ s3://aws-frontend-emails-test/
