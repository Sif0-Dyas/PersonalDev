/**
 * Converts a Roman numeral to an integer.
 * @param {string} s - The Roman numeral to convert.
 * @return {number} - The integer value of the Roman numeral.
 */
var romanToInt = function(s) {
    // Define a mapping between Roman numerals and their corresponding values.
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    // Initialize the running total to 0 and the previous value to 0.
    let result = 0;
    let prev = 0;
    // Iterate through the characters of the input string from right to left.
    for (let i = s.length - 1; i >= 0; i--) {
        const current = romanMap[s.charAt(i)]; // Get the value of the current character.
        if (current >= prev) {
            // If the current value is greater than or equal to the previous value, add it to the total.
            result += current;
        } else {
            // Otherwise, subtract it from the total.
            result -= current;
        }
        prev = current; // Set the previous value to the current value for the next iteration.
    }
    // Return the final total.
    return result;
};

console.log(romanToInt('XXVII')); // Output: 27
console.log(romanToInt('IV')); // Output: 4
console.log(romanToInt('IX')); // Output: 9
