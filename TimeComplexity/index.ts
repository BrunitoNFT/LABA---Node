// Merge Sort

// example: [23,12,26,4]
function mergeSortt<T>(array: T[]): T[] {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2); // 1) 2 | 2) 1
  const left = mergeSortt(array.slice(0, mid)); // 1) [23,12] | 2) Here we are going to send 23 (left) and 12 (right) -> Due to the 23 and 12 are going to be unique arrays they will return in the first if block and will go 23 and 12 to merge([23],[12])
  const right = mergeSortt(array.slice(mid)); // 1) [26,4] |

  return mergee(left, right);
}

// Our left side will call this method merge first [23] [12]
function mergee<T>(left: T[], right: T[]): T[] {
  let result: T[] = []; // [23]
  let i = 0;
  let j = 0; // 1

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // [12].concat(left [23]).concat(right [])
  return result.concat(left.slice(i)).concat(right.slice(j)); // [12, 23]
}

// Quick Sort
// [43,12,2,3]
// [43,12]
function quickSortt<T>(array: T[]): T[] {
  if (array.length <= 1) return array;

  const pivot = array[array.length - 1]; // 3 //second call 12
  const left = [];
  const right = [];

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  //left [2] \ left []
  //right [43,12] \ right [43]

  // second time we will return [[],pivot 12, right 43] [12,43]
  return [
    ...quickSortt(left) /*We have 2 finally here*/,
    pivot /*3*/,
    ...quickSortt(right) /*we trigger here quick([43,12]) -> 12, 43k*/
  ];
}

// Bubble Sort
function bubbleSortt(arr: number[]): number[] {
  const n = arr.length;
  // Bucle externo para controlar cada pasada
  for (let i = 0; i < n - 1; i++) {
    // Bucle interno para hacer las comparaciones y swaps
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap los elementos usando desestructuración en TS
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
/*
Time complexity of Bubble Sort:
Due to the fact that this algorithm has a nested loop, it is always O(n^2) where n is the length of the array to sort.
It is the slowest sort algorithm because of it exponenciall time duration related with array items.
*/

module.exports = {
  bubbleSortt,
  mergeSortt,
  quickSortt
};
