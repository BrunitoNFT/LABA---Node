"use strict";
// Homework 7
// Analyzing Sorting Algorithm Performance
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                let aux = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = aux;
            }
        }
    }
    return arr;
}
function quickSort(arr) {
    if (arr.length == 0 || arr.length == 1)
        return arr;
    let pivotPosition = Math.floor(arr.length / 2);
    let pivotItem = arr[pivotPosition];
    arr.splice(pivotPosition, 1);
    return [
        ...quickSort(arr.filter(e => e < pivotItem)),
        pivotItem,
        ...quickSort(arr.filter(e => e > pivotItem))
    ];
}
function mergesort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);
    return merge(mergesort(leftArr), mergesort(rightArr));
}
function merge(leftArr, rightArr) {
    const sortedArr = [];
    while (leftArr.length && rightArr.length) {
        if (leftArr[0] <= rightArr[0]) {
            sortedArr.push(leftArr.shift());
        }
        else {
            sortedArr.push(rightArr.shift());
        }
    }
    const resultArr = [...sortedArr, ...leftArr, ...rightArr];
    return resultArr;
}
let results = [];
function testSortAlgorithm(arr, sortAlgorithm) {
    if (!Array.isArray(arr)) {
        throw new Error('The first parameter is not an array.');
    }
    if (!['quick', 'bubble', 'merge'].includes(sortAlgorithm)) {
        throw new Error('The sort algorithm is not valid.');
    }
    let time = Date.now();
    switch (sortAlgorithm) {
        case 'merge':
            mergesort(arr);
            let time1 = Date.now();
            return time1 - time;
        case 'quick':
            quickSort(arr);
            return Date.now() - time;
        default:
            bubbleSort(arr);
            return Date.now() - time;
    }
}
function generateArr(length) {
    let arr = [];
    for (let index = 0; index < length; index++) {
        let randomNumber = Math.round(Math.random() * 1000);
        arr.push(randomNumber);
    }
    return arr;
}
for (let index = 0; index < 50; index++) {
    let arr = generateArr(index * index * 3);
    let quickTime = testSortAlgorithm(arr, 'quick');
    let bubbleTime = testSortAlgorithm(arr, 'bubble');
    let mergeTime = testSortAlgorithm(arr, 'merge');
    results.push({
        arrLength: arr.length,
        quickSortTime: quickTime,
        bubbleSortTime: bubbleTime,
        mergeSortTime: mergeTime,
        faster: quickTime < bubbleTime && quickTime < mergeTime
            ? 'quick'
            : bubbleTime < quickTime && bubbleTime < mergeTime
                ? 'bubble'
                : mergeTime < quickTime && mergeTime < bubbleTime
                    ? 'merge'
                    : '-'
    });
}
console.log('Results for Sorting Algorithm Performance Analysis\n');
console.log('Array Length | QuickSort Time (ms) | BubbleSort Time (ms) | MergeSort Time (ms) | Faster');
console.log('-'.repeat(90));
for (const result of results) {
    console.log(`${result.arrLength.toString().padEnd(13)}|` +
        `${result.quickSortTime.toString().padEnd(22)}|` +
        `${result.bubbleSortTime.toString().padEnd(22)}|` +
        `${result.mergeSortTime.toString().padEnd(19)}|` +
        `${result.faster.padEnd(8)}`);
}
console.log('-'.repeat(90));
console.log(`
Time complexity of Bubble Sort:
Due to the fact that this algorithm has a nested loop, it is always O(n^2) where n is the length of the array to sort.
It is the slowest sort algorithm because of it exponencial time duration related with array items.
`);
console.log(`
Time complexity of Merge Sort:
Merge Sort has a time complexity of O(n log n), where n is the number of elements in the array. 
This makes Merge Sort an efficient algorithm for sorting large arrays, as it has a better time complexity compared to Bubble Sort's O(n^2).
`);
console.log(`
Time complexity of Quick Sort:
Quick Sort also has an average time complexity of O(n log n), but it can degrade to O(n^2) in the worst case. 
However, in practice, Quick Sort is often faster than Merge Sort and Bubble Sort due to its lower constant factors and efficient partitioning.
`);
