/* Task 1: Immutability and Pure Functions

1. Implement a pure function called `calculateDiscountedPrice` that takes an array of products and a discount percentage as arguments. The function should return a new array of products with discounted prices based on the given percentage, without modifying the original products.

2. Create a pure function called `calculateTotalPrice` that takes an array of products as an argument. The function should return the total price of all products, without modifying the original array or its items.

Task 2: Function Composition and Point-Free Style

1. Implement a function called `getFullName` that takes a person object with `firstName` and `lastName` properties. The function should return the person's full name in the format "FirstName LastName".

2. Create a function called `filterUniqueWords` that takes a string of text and returns an array of unique words, sorted in alphabetical order, without using explicit loops. Use function composition and point-free style.

3. Implement a function called `getAverageGrade` that takes an array of student objects, each containing a `name` and `grades` property. The function should return the average grade of all students, without modifying the original array or its items. Use function composition and point-free style.

Task 3: Closures and Higher-Order Functions

1. Create a function called `createCounter` that returns a closure. The closure should be a counter function that increments the count on each call and returns the updated count. Each closure should have its own independent count.

2. Implement a higher-order function called `repeatFunction` that takes a function and a number as arguments. The function should return a new function that invokes the original function multiple times based on the provided number. If the number is negative, the new function should invoke the original function indefinitely until stopped.

Task 4: Recursion and Tail Call Optimization

1. Implement a recursive function called `calculateFactorial` that calculates the factorial of a given number. Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.

    2. Create a recursive function called `power` that takes a base and an exponent as arguments. The function should calculate the power of the base to the exponent using recursion.

Task 5: Lazy Evaluation and Generators

1. Implement a lazy evaluation function called `lazyMap` that takes an array and a mapping function. The function should return a lazy generator that applies the mapping function to each element of the array one at a time.

2. Create a lazy generator function called `fibonacciGenerator` that generates Fibonacci numbers one at a time using lazy evaluation. */

// 1.1)

interface Product {
  name: string;
  price: number;
}

function calculateDiscountedPrice(
  products: Product[],
  discountPercentage: number
): Product[] {
  // Create a new array to store the products with discounted prices
  const discountedProducts: Product[] = [];
  if (discountPercentage > 100 || discountPercentage < 0) {
    throw new Error('Discount percentage must be between 0 and 100.');
  }
  // Calculate the discounted price for each product and add it to the new array
  for (const product of products) {
    const discountedPrice = product.price * (1 - discountPercentage / 100);
    discountedProducts.push({ ...product, price: discountedPrice });
  }

  return discountedProducts;
}

// 1.2)

function calculateTotalPrice(products: Product[]): number {
  // Calculate the total price of all products
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);

  return totalPrice;
}

// 2.1)

function getFullName(person: { firstName: string; lastName: string }) {
  return `${person.firstName.charAt(0).toUpperCase() +
    person.firstName.slice(1).toLowerCase()} ${person.lastName
    .charAt(0)
    .toUpperCase() + person.lastName.slice(1).toLowerCase()}`;
}

// 2.2)

function filterUniqueWords(text: string): string[] {
  const splitText = (text: string) => text.split(/\W+/);
  const getUniqueWords = (words: string[]) => Array.from(new Set(words));
  const sortAlphabetically = (words: string[]) =>
    words.sort((a, b) => a.localeCompare(b));

  const uniqueWords = splitText(text).filter(Boolean);
  return sortAlphabetically(getUniqueWords(uniqueWords));
}

// 2.3)

interface Student {
  name: string;
  grades: number[];
}

function getAverageGrade(students: Student[]): number {
  const getGrades = (students: Student[]) =>
    students.flatMap(student => student.grades);
  const calculateAverage = (grades: number[]) =>
    grades.reduce((acc, grade) => acc + grade, 0) / grades.length;

  return calculateAverage(getGrades(students));
}

// 3.1)

function createCounter() {
  let count = 0; // This variable is private to the closure

  function counter() {
    count++;
    return count;
  }

  return counter;
}

// 3.2)

type FunctionToRepeat = () => void;

function repeatFunction(
  func: FunctionToRepeat,
  times: number
): FunctionToRepeat {
  if (times >= 0) {
    return function() {
      for (let i = 0; i < times; i++) {
        func();
      }
    };
  } else {
    return function() {
      while (true) {
        func();
      }
    };
  }
}

// 4.1)

function calculateFactorial(n: number, accumulator: number = 1): number {
  if (n === 0) {
    return accumulator;
  }

  return calculateFactorial(n - 1, n * accumulator);
}

// 4.2)

function power(base: number, exponent: number): number {
  if (exponent === 0) {
    return 1;
  }

  if (exponent === 1) {
    return base;
  }

  if (exponent < 0) {
    return 1 / power(base, -exponent);
  }

  return base * power(base, exponent - 1);
}

// 5.1)

function* lazyMap<T, R>(
  array: T[],
  mappingFunction: (element: T) => R
): Generator<R> {
  for (const element of array) {
    yield mappingFunction(element);
  }
}

// 5.2)

function* fibonacciGenerator(): Generator<number> {
  let prev = 0;
  let curr = 1;

  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

module.exports = {
  calculateDiscountedPrice,
  calculateTotalPrice,
  getFullName,
  filterUniqueWords,
  getAverageGrade,
  createCounter,
  repeatFunction,
  calculateFactorial,
  power,
  lazyMap,
  fibonacciGenerator
};
