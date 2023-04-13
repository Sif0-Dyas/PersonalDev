function isPalindrome(str) {
    // Convert the input string to lowercase and remove non-alphanumeric characters
    const cleanedStr = str.toLowerCase().replace(/[\W_]/g, '');

    // Reverse the cleaned string
    const reversedStr = cleanedStr.split('').reverse().join('');

    // Check if the cleaned string is equal to its reversed version
    return cleanedStr === reversedStr;
}

console.log(isPalindrome("did"))
// ^^ should return true the rest below should all be false
console.log(isPalindrome("3did"))
console.log(isPalindrome("not"))
console.log(isPalindrome("not!"))