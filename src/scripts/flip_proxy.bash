#!/bin/sh
proxy="http://proxy.bloomberg.com:81"
sslcert="~/bb-cert/bloomberg-root-ca.crt"
npmRegistry="http://registry.npmjs.org/"

msgUsingProxy="STATUS: Using proxy at: \n\n$proxy"
msgNotUsingProxy="STATUS: Not using a proxy"

print_corporate() {
    echo -e "\e[38;2;255;165;0;48;5;0m$1\e[0m"
}
print_home() {
    echo -e "\e[32;40m$1\e[0m"
}
print_blue(){
    echo -e "\e[34m$1\e[0m"
}

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


lineBreak="-------------------------------------------------------------------"

echo "  "
print_blue "CURRENT CONFIGURATIONS: "
echo "  "
print_blue " Git:"
print_blue $lineBreak
git config --global -l | grep https://github.com
echo "  "
print_blue " Npm:"
print_blue $lineBreak
npm config list --json | grep -E '"proxy":|"registry":|"https-proxy"'
echo "  "

