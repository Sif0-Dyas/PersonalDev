function solution(n) {

    if (n < 0) {
        return 0;
    } else {
        let multiples = new Set();
        for (let i = 3; i < n; i++) {
            if (i % 3 === 0 || i % 5 === 0) {
                multiples.add(i);
            }
        }
        return [...multiples].reduce((sum, curr) => sum + curr, 0);
    }
};
console.log(solution(10))




function sumMultiples(n) {
    // Check if the input is negative
    if (n < 0) {
        // If it is, return 0
        return 0;
    } else {
        // If it's non-negative, create an empty Set to store the multiples
        let multiples = new Set();
        // Loop over all the numbers from 3 up to n-1
        for (let i = 3; i < n; i++) {
            // If the current number is a multiple of 3 or 5, add it to the Set
            if (i % 3 === 0 || i % 5 === 0) {
                multiples.add(i);
            }
        }
        // Convert the Set to an array, and sum up the elements using reduce()
        return [...multiples].reduce((sum, curr) => sum + curr, 0);
        //            ^^^^^^              ^^^^^
        // Convert the Set to an array     | 
        // using the spread operator   The callback function takes two parameters:
        //                               the accumulator (sum) and the current value (curr)
        //                               of the array element being processed
        //                               |
        //                               The callback function adds the current value to the
        //                               accumulator (sum), and returns the updated sum
        //                               |
        //                               The initial value of the accumulator is 0 (since we
        //                               want to start with a sum of 0)
    }
}
