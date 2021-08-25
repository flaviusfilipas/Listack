function isBlank(str) {
    if((!str || /^\s*$/.test(str))){
        return 'Field must not be blank!'
    }
    return true
}
export {
    isBlank
}