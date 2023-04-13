function mergeSortedArrays(arr1, arr2) {
    // Check if both input arrays are sorted
    const isSorted = arr => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                return false
            }
        }
        return true;
    }

    if (!isSorted(arr1)) {
        arr1.sort();
    }

    if (!isSorted(arr2)) {
        arr2.sort();
    }

    // Create an empty array to store the merged array
    const mergedArr = [];

    // Initialize two pointers, one for each input array
    let i = 0;
    let j = 0;

    // Loop through both input arrays and compare their elements
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            mergedArr.push(arr1[i]);
            i++;
        } else {
            mergedArr.push(arr2[j]);
            j++;
        }
    }

    // Add any remaining elements from arr1 to the merged array
    while (i < arr1.length) {
        mergedArr.push(arr1[i]);
        i++;
    }

    // Add any remaining elements from arr2 to the merged array
    while (j < arr2.length) {
        mergedArr.push(arr2[j]);
        j++;
    }

    // Return the merged array
    return mergedArr;
}


console.log(mergeSortedArrays([1, 2, 3, 4], [8, 5, 7, 6]))
console.log(mergeSortedArrays(['Bravo', 'Alpha', 'Charlie'], ['Echo', 'Fox', 'Delta']))











// advanced: 