"use strict";
/* Homework 5:
Deadline 07.08.2023

Task 1: Advanced Array Filtering

1. Create a function called `customFilterUnique` that takes an array and a callback function as arguments. The `customFilterUnique` function should filter the array using the callback function to determine uniqueness. The resulting array should contain only unique elements based on the callback's logic.

2. Use the `customFilterUnique` function to filter an array of objects based on a specific property and return only unique objects.

Task 2: Array Chunking

1. Create a function called `chunkArray` that takes an array and a chunk size as arguments. The `chunkArray` function should divide the array into smaller arrays, each containing elements of the specified chunk size. The function should return an array of arrays.

2. Optimize the `chunkArray` function to minimize memory usage while chunking the array.

Task 3: Array Shuffling

1. Create a function called `customShuffle` that takes an array as an argument and returns a new array with its elements randomly shuffled.

2. Implement the `customShuffle` function using an efficient shuffling algorithm to achieve uniform randomness.

Task 4: Array Intersection and Union

1. Create a function called `getArrayIntersection` that takes two arrays as arguments and returns a new array containing the common elements between the two arrays.

2. Create a function called `getArrayUnion` that takes two arrays as arguments and returns a new array containing all unique elements from both arrays, without any duplicates.

Task 5: Array Performance Analysis

1. Implement a function called `measureArrayPerformance` that takes a function and an array as arguments. The `measureArrayPerformance` function should execute the provided function with the given array as input and measure the execution time.

2. Use the `measureArrayPerformance` function to compare the performance of built-in array methods (`map`, `filter`, `reduce`, etc.) against your custom array manipulation functions. */
function customFilterUnique(array, callback) {
    const uniqueArray = [];
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (callback(item, i, array)) {
            uniqueArray.push(item);
        }
    }
    return uniqueArray;
}
// task 2
function chunkArray(arr, chunkSize) {
    const chunkedArray = [];
    let index = 0;
    while (index < arr.length) {
        const chunk = new Array(Math.min(chunkSize, arr.length - index));
        for (let i = 0; i < chunk.length; i++) {
            chunk[i] = arr[index + i];
        }
        chunkedArray.push(chunk);
        index += chunkSize;
    }
    return chunkedArray;
}
// task 3
function customShuffle(arr) {
    const shuffledArray = [...arr];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[randomIndex]] = [
            shuffledArray[randomIndex],
            shuffledArray[i]
        ];
    }
    return shuffledArray;
}
// task 4
function getArrayIntersection(array1, array2) {
    return array1.filter(item => array2.includes(item));
}
function getArrayUnion(array1, array2) {
    const set = new Set([...array1, ...array2]);
    return Array.from(set);
}
// task 5
// Function to measure the performance of a given function with an array and a callback
function measureArrayPerformance(func, arr, callback) {
    const startTime = Date.now();
    func(arr, callback);
    const endTime = Date.now();
    return endTime - startTime;
}
module.exports = {
    customFilterUnique,
    chunkArray,
    customShuffle,
    getArrayIntersection,
    getArrayUnion,
    measureArrayPerformance
};
