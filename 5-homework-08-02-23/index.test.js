const {
  customFilterUnique,
  chunkArray,
  customShuffle,
  getArrayIntersection,
  getArrayUnion,
  measureArrayPerformance
} = require('./index.js');

// task 1
describe('customFilterUnique', () => {
  test('should filter the array based on the callback and return unique elements', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const isEven = num => num % 2 === 0;
    const filteredArray = customFilterUnique(array, isEven);
    expect(filteredArray).toEqual([2, 4, 6, 8, 10]);
  });
});

// task 2
describe('chunkArray', () => {
  test('should divide the array into smaller arrays of the specified chunk size', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const chunkSize = 3;
    const chunkedArray = chunkArray(array, chunkSize);
    expect(chunkedArray).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
  });
});

// task 3
describe('customShuffle', () => {
  test('should return a new array with its elements randomly shuffled', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffledArray = customShuffle(array);
    expect(shuffledArray.sort()).toEqual(array.sort());
  });
});

// task 4
describe('getArrayIntersection', () => {
  test('should return a new array containing the common elements between the two arrays', () => {
    const array1 = [1, 2, 3, 4, 5];
    const array2 = [4, 5, 6, 7, 8];
    const intersection = getArrayIntersection(array1, array2);
    expect(intersection).toEqual([4, 5]);
  });
});

describe('getArrayUnion', () => {
  test('should return a new array containing all unique elements from both arrays', () => {
    const array1 = [1, 2, 3, 4, 5];
    const array2 = [4, 5, 6, 7, 8];
    const union = getArrayUnion(array1, array2);
    expect(union).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

// task 5
describe('measureArrayPerformance', () => {
  const testArray = Array.from({ length: 100000 }, (_, index) => index);

  it('should measure the performance of customMap', () => {
    function customMap(arr, callback) {
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i], i, arr));
      }
      return result;
    }

    const customMapTime = measureArrayPerformance(
      customMap,
      testArray,
      value => value * 2
    );
    expect(typeof customMapTime).toBe('number');
  });

  it('should measure the performance of builtInMap', () => {
    function builtInMap(arr, callback) {
      return arr.map(callback);
    }

    const builtInMapTime = measureArrayPerformance(
      builtInMap,
      testArray,
      value => value * 2
    );
    expect(typeof builtInMapTime).toBe('number');
  });

  it('should measure the performance of customFilter', () => {
    function customFilter(arr, callback) {
      const filteredArray = [];
      for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
          filteredArray.push(arr[i]);
        }
      }
      return filteredArray;
    }

    const customFilterTime = measureArrayPerformance(
      customFilter,
      testArray,
      value => value % 2 === 0
    );
    expect(typeof customFilterTime).toBe('number');
  });

  it('should measure the performance of builtInFilter', () => {
    const builtInFilterTime = measureArrayPerformance(
      arr => arr.filter(value => value % 2 === 0),
      testArray
    );
    expect(typeof builtInFilterTime).toBe('number');
  });

  it('should measure the performance of customReduce', () => {
    function customReduce(arr, callback, initialValue) {
      let accumulator = initialValue;
      for (let i = 0; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr);
      }
      return accumulator;
    }

    const customReduceTime = measureArrayPerformance(
      customReduce,
      testArray,
      (acc, value) => acc + value,
      0
    );
    expect(typeof customReduceTime).toBe('number');
  });

  it('should measure the performance of builtInReduce', () => {
    const builtInReduceTime = measureArrayPerformance(
      arr => arr.reduce((acc, value) => acc + value, 0),
      testArray
    );
    expect(typeof builtInReduceTime).toBe('number');
  });
});
