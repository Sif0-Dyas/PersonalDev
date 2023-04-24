function firstNonRepChar(str) {

    const freq = {};

    for (var i = 0; i < str.length; i++) {
        const char = str[i];
        freq[char] = freq[char] ? freq[char] + 1 : 1;
    }

    console.log(freq)
    
    for (var i = 0; i < str.length; i++) {
        const char = str[i];
        if (freq[char] === 1) {
            return char;
        }
    }

    return null;

}

console.log(firstNonRepChar("aaabbcddd"))
console.log(firstNonRepChar("aaabcddd"))
console.log(firstNonRepChar("aaabbccd"))
console.log(firstNonRepChar("aaabbccdd"))