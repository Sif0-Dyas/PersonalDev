function firstNonRepeatedCharacter(str) {
    // use a frequency table
    // Create an empty object to store the frequency of each character in the input string
    const charFrequency = {};

    // Loop through the input string and update the frequency of each character in the charFrequency object
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        charFrequency[char] = charFrequency[char] ? charFrequency[char] + 1 : 1;
    }

    // Displays the frequnecy table
    console.log(freq)

    // Loop through the input string again and return the first non-repeated character
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (charFrequency[char] === 1) {
            return char;
        }
    }

    // If all characters in the input string are repeated, return null
    return null;
}

// should return "c", "b", "d", null
console.log(firstNonRepeatedCharacter("aaabbcddd"))
console.log(firstNonRepeatedCharacter("aaabcddd"))
console.log(firstNonRepeatedCharacter("aaabbccd"))
console.log(firstNonRepeatedCharacter("aaabbccdd"))