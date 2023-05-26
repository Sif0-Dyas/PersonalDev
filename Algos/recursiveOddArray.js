function oddArray(arr) { // Define a function named 'oddArray' that takes an array as a parameter.

    let result = []; // Create an empty array called 'result' to store the odd numbers.

    function helperRecur(arr) { // Define a helper function named 'helperRecur' that takes an array as a parameter.

        if (arr.length === 0) { // If the array is empty (base case), return from the function.
            return;
        } else if (arr[0] % 2 !== 0) { // If the first element of the array is odd, add it to the 'result' array.
            result.push(arr[0]);
        }

        helperRecur(arr.slice(1)); // Call the 'helperRecur' function recursively with the remaining elements of the array (excluding the first element).

    }

    helperRecur(arr); // Call the 'helperRecur' function with the input array.

    // console.log(result) // Optional: Print the 'result' array (commented out in this code).

    return result; // Return the 'result' array containing the odd numbers.
}

oddArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // Call the 'oddArray' function with an example input array.
