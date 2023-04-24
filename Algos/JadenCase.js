function toJadenCase(string) {
    // Split the input string into an array of words
    const words = string.split(' ');

    // Use the map method to apply a function to each word in the array
    const capitalizedWords = words.map(word => {
        // For each word, uppercase the first letter and concatenate it with the rest of the word
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
        return capitalizedWord;
    });

    // Join the capitalized words back into a single string, separated by spaces
    const jadenCaseString = capitalizedWords.join(' ');
    return jadenCaseString;
}

// Test the function with a sample quote
const quote = "How can mirrors be real if our eyes aren't real";
const jadenCase = toJadenCase(quote);
console.log(jadenCase);
