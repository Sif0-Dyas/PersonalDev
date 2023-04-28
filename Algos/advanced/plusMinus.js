// Enable standard input stream
'use strict';
process.stdin.resume();
process.stdin.setEncoding('utf-8');

// Initialize inputString and currentLine variables
let inputString = '';
let currentLine = 0;

// Read input from standard input stream
process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

// Parse input and call main function
process.stdin.on('end', function() {
    // Split inputString into array of lines
    inputString = inputString.split('\n');

    // Call main function
    main();
});

// Read a single line of input from inputString
function readLine() {
    return inputString[currentLine++];
}



function plusMinus(arr) {
    // Initialize variables to count positive, negative, and zero values
    let positives = 0;
    let negatives = 0;
    let zeros = 0;

    // Loop through each element in the array
    for (let i = 0; i < arr.length; i++) {
        // Increment the appropriate counter based on the value of the current element
        if (arr[i] > 0) {
            positives++;
        } else if (arr[i] < 0) {
            negatives++;
        } else {
            zeros++;
        }
    }

    // Calculate ratios and output them to the console
    const positiveRatio = positives / arr.length;
    const negativeRatio = negatives / arr.length;
    const zeroRatio = zeros / arr.length;
    console.log(positiveRatio.toFixed(6));
    console.log(negativeRatio.toFixed(6));
    console.log(zeroRatio.toFixed(6));
}

// Main function
function main() {
    // Read the first line of input and parse it as an integer
    const n = parseInt(readLine().trim(), 10);

    // Read the second line of input, split it into an array of strings, parse each string as an integer, and create an array of integers
    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    // Call the plusMinus function with the array as its argument
    plusMinus(arr);
}
