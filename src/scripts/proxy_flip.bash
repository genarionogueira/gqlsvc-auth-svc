#!/bin/sh

# source the print functions
source "$(dirname "$0")/utils.bash"

proxy="http://proxy.bloomberg.com:81"
sslcert="~/bb-cert/bloomberg-root-ca.crt"
npmRegistry="http://registry.npmjs.org/"

msgUsingProxy="STATUS: Using proxy at: \n\n$proxy"
msgNotUsingProxy="STATUS: Not using a proxy"



echo "  "

if [[ $(git config --global http.https://github.com.proxy) ]]; then

    git config --global --unset http.https://github.com.proxy
    git config --global --unset http.https://github.com.sslcainfo

    npm config delete proxy
    npm config delete https-proxy
    npm config set registry=$npmRegistry

    print_home "$msgNotUsingProxy"
else
    git config --global http.https://github.com.proxy $proxy
    git config --global http.https://github.com.sslcainfo $proxy

    npm config set proxy=$proxy
    npm config set https-proxy=$proxy
    npm config set registry=$npmRegistry


    print_corporate "$msgUsingProxy"
fi


print_status

