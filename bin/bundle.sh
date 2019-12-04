#!/bin/bash -e

rm editorial-emails.zip || true
cd target
zip -r ../editorial-emails.zip *
cd ..
