function reverseString(str) {
    // Convert the input string to an array, reverse the array, and join the elements back into a string
    const reversedStr = str.split('').reverse().join('');

    // Return the reversed string
    return reversedStr;
}
// should return "tacocat", and "esoom"
console.log(reverseString("tacocat"))
console.log(reverseString("mooose"))