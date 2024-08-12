print_corporate() {
    echo -e "\e[38;2;255;165;0;48;5;0m$1\e[0m"
}
print_home() {
    echo -e "\e[32;40m$1\e[0m"
}
print_blue(){
    echo -e "\e[34m$1\e[0m"
}


print_status(){
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
}
