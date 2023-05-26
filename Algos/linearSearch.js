const array = [3, 8, 12, 6, 10, 2];

function checkForN(arr, n) {
    for (let i = 0; i < arr.length; i++) { // Iterate over each element of the input array 'arr'
        if (n === arr[i]) { // Check if the current element is equal to the target number 'n'
            return `${true} ${n} exists at index ${i}`; // If a match is found, return a string indicating that 'n' exists at the current index 'i'
        }
    }

    return `${false} ${n} does not exist in the given array.`; // If the loop completes without finding a match, return a string indicating that 'n' does not exist in the array
}

console.log(checkForN(array, 10)); // Call the 'checkForN' function with the input array 'array' and the target number 10, and print the result to the console
