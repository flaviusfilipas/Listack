function capitalizeFirstLetters(words) {
    let capitalizedString = ''
    if (words.length === 1) {
        return words[0].toLowerCase().charAt(0).toUpperCase() + words[0].toLowerCase().slice(1);
    }
    for (let word of words) {
        if (typeof (word) === 'string') {
            capitalizedString += word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1) + " "
        }
    }
    return capitalizedString.trim();
}

export {
    capitalizeFirstLetters
}