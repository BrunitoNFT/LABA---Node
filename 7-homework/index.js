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
function generateArr(length, type) {
    let arr = [];
    for (let index = 0; index < length; index++) {
        let randomNumber = Math.round(Math.random() * 1000);
        arr.push(randomNumber);
    }
    switch (type) {
        case 'sorted':
            return arr.sort((a, b) => a - b);
        case 'reverse':
            return arr.sort((a, b) => b - a);
        default:
            return arr;
    }
}
let consecutiveTimes = { method: '-', times: 0, arrLength: 0 };
for (let index = 0; index < 40; index++) {
    let arrSorted = generateArr(index * index * 3, 'sorted');
    let arrReverse = generateArr(index * index * 3, 'reverse');
    let arrRandom = generateArr(index * index * 3, 'random');
    let quickTimeSorted = testSortAlgorithm(arrSorted, 'quick');
    let quickTimeReverse = testSortAlgorithm(arrReverse, 'quick');
    let quickTimeRandom = testSortAlgorithm(arrRandom, 'quick');
    let bubbleTimeSorted = testSortAlgorithm(arrSorted, 'bubble');
    let bubbleTimeReverse = testSortAlgorithm(arrReverse, 'bubble');
    let bubbleTimeRandom = testSortAlgorithm(arrRandom, 'bubble');
    let mergeTimeSorted = testSortAlgorithm(arrSorted, 'merge');
    let mergeTimeReverse = testSortAlgorithm(arrReverse, 'merge');
    let mergeTimeRandom = testSortAlgorithm(arrRandom, 'merge');
    let sortFastest = quickTimeSorted < bubbleTimeSorted && quickTimeSorted < mergeTimeSorted
        ? 'quick'
        : bubbleTimeSorted < quickTimeSorted && bubbleTimeSorted < mergeTimeSorted
            ? 'bubble'
            : mergeTimeSorted < quickTimeSorted && mergeTimeSorted < bubbleTimeSorted
                ? 'merge'
                : 'none';
    let reverseFastest = quickTimeReverse < bubbleTimeReverse && quickTimeReverse < mergeTimeReverse
        ? 'quick'
        : bubbleTimeReverse < quickTimeReverse &&
            bubbleTimeReverse < mergeTimeReverse
            ? 'bubble'
            : mergeTimeReverse < quickTimeReverse &&
                mergeTimeReverse < bubbleTimeReverse
                ? 'merge'
                : 'none';
    let randomFastest = quickTimeRandom < bubbleTimeRandom && quickTimeRandom < mergeTimeRandom
        ? 'quick'
        : bubbleTimeRandom < quickTimeRandom && bubbleTimeRandom < mergeTimeRandom
            ? 'bubble'
            : mergeTimeRandom < quickTimeRandom && mergeTimeRandom < bubbleTimeRandom
                ? 'merge'
                : 'none';
    let winner = sortFastest === 'quick' &&
        reverseFastest === 'quick' &&
        randomFastest === 'quick'
        ? 'quick'
        : sortFastest === 'merge' &&
            reverseFastest === 'merge' &&
            randomFastest === 'merge'
            ? 'merge'
            : sortFastest === 'bubble' &&
                reverseFastest === 'bubble' &&
                randomFastest === 'bubble'
                ? 'bubble'
                : '-';
    consecutiveTimes = {
        times: consecutiveTimes.method === winner ? consecutiveTimes.times + 1 : 1,
        method: winner,
        arrLength: consecutiveTimes.method === winner
            ? consecutiveTimes.arrLength
            : arrSorted.length
    };
    results.push({
        arrLength: arrSorted.length,
        quickSortTime: {
            sortArr: quickTimeSorted,
            reverseArr: quickTimeReverse,
            randomArr: quickTimeRandom
        },
        bubbleSortTime: {
            sortArr: bubbleTimeSorted,
            reverseArr: bubbleTimeReverse,
            randomArr: bubbleTimeRandom
        },
        mergeSortTime: {
            sortArr: mergeTimeSorted,
            reverseArr: mergeTimeReverse,
            randomArr: mergeTimeRandom
        },
        faster: winner
    });
    if (consecutiveTimes.method !== '-' && consecutiveTimes.times >= 3) {
        break;
    }
}
console.log("Ra: Random array | Re: Reverse array | S: Sorted array");
console.log('Results for Sorting Algorithm Performance Analysis\n');
console.log('Array Length | QuickSort Time (ms)     | BubbleSort Time (ms)      | MergeSort Time (ms)        | Faster');
console.log('-'.repeat(90));
for (const result of results) {
    console.log(`${result.arrLength.toString().padEnd(13)} ` +
        `${('Ra: ' +
            result.quickSortTime.randomArr.toString() +
            ' | S: ' +
            result.quickSortTime.sortArr.toString() +
            ' | Re: ' +
            result.quickSortTime.reverseArr.toString() +
            ' |').padEnd(26)}` +
        `${('Ra: ' +
            result.bubbleSortTime.randomArr.toString() +
            ' | S: ' +
            result.bubbleSortTime.sortArr.toString() +
            ' | Re: ' +
            result.bubbleSortTime.reverseArr.toString() +
            ' |').padEnd(28)}` +
        `${('Ra: ' +
            result.mergeSortTime.randomArr.toString() +
            ' | S: ' +
            result.mergeSortTime.sortArr.toString() +
            ' | Re: ' +
            result.mergeSortTime.reverseArr.toString() +
            ' |').padEnd(28)}` +
        `${result.faster}`);
}
console.log('-'.repeat(90));
console.log(`${results[results.length - 3].faster} started to win consitently at:  ${results[results.length - 3].arrLength} array length`);
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
