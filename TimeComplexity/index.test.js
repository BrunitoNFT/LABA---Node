const { mergeSort, quickSort, bubbleSort } = require('./index.js');
const now = require('performance-now');

const sortedArray = [1, 2, 3, 4, 5];
const sortedBackwardArray = [5, 4, 3, 2, 1];
const randomArray = [3, 1, 4, 1, 5, 9, 2, 6, 5];

const sorts = [bubbleSort, mergeSort, quickSort];

sorts.forEach(sortFn => {
  test(`${sortFn.name} with Sorted Array`, () => {
    expect(sortFn([...sortedArray])).toEqual(sortedArray);
  });

  test(`${sortFn.name} with Sorted Backward Array`, () => {
    expect(sortFn([...sortedBackwardArray])).toEqual(
      [...sortedBackwardArray].reverse()
    );
  });

  test(`${sortFn.name} with Random Array`, () => {
    expect(sortFn([...randomArray])).toEqual(randomArray.sort((a, b) => a - b));
  });
});

function generateArrays(length) {
  const sorted = [...Array(length).keys()].map(n => n + 1);
  const sortedBackward = [...sorted].reverse();
  const random = sorted.sort(() => Math.random() - 0.5);

  return [sorted, sortedBackward, random];
}

function measureTime(fn, ...args) {
  const start = now();
  fn(...args);
  const end = now();

  return (end - start).toFixed(3);
}

describe('Performance', () => {
  console.log('test clg');
  const sorts = [bubbleSort, mergeSort, quickSort];

  const results = {
    bubbleSort: [],
    mergeSort: [],
    quickSort: []
  };

  const maxArrayLength = 1000; // or adjust as necessary
  let surpassedStartLength = -1;
  let consecutiveCounter = 0; // Counter for consecutive surpasses

  for (let length = 2; length <= maxArrayLength; length++) {
    const arrays = generateArrays(length);

    sorts.forEach(sortFn => {
      const totalTime =
        arrays
          .map(array => parseFloat(measureTime(sortFn, [...array])))
          .reduce((a, b) => a + b) / 3; // average time across array types
      results[sortFn.name].push(totalTime);
    });

    // Check if BubbleSort is surpassed by both others at this length
    if (
      results.bubbleSort[length - 2] > results.mergeSort[length - 2] &&
      results.bubbleSort[length - 2] > results.quickSort[length - 2]
    ) {
      consecutiveCounter++;
      if (surpassedStartLength === -1) {
        surpassedStartLength = length - 2;
      }
    } else {
      consecutiveCounter = 0; // Reset the counter if the condition is not met
      surpassedStartLength = -1; // Reset the start length too
    }

    if (consecutiveCounter === 10) {
      break; // Stop testing if the counter reaches 10
    }
  }
  console.log('result ', results);
  if (surpassedStartLength !== -1) {
    console.log(
      `BubbleSort was first surpassed by both QuickSort and MergeSort at array length of ${surpassedStartLength} and was consecutively surpassed 10 times by the time it reached array length of ${surpassedStartLength +
        10}`
    );
  } else {
    console.log("BubbleSort wasn't surpassed up to the tested array length");
  }
});
