const {
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
} = require('./index');

// Task 1: Immutability and Pure Functions

describe('calculateDiscountedPrice', () => {
  it('should apply the discount to all products', () => {
    const products = [
      { name: 'Product 1', price: 100 },
      { name: 'Product 2', price: 50 },
      { name: 'Product 3', price: 75 }
    ];
    const discountPercentage = 20;
    const discountedProducts = calculateDiscountedPrice(
      products,
      discountPercentage
    );

    expect(discountedProducts).toEqual([
      { name: 'Product 1', price: 80 },
      { name: 'Product 2', price: 40 },
      { name: 'Product 3', price: 60 }
    ]);
  });

  it('should handle discountPercentage = 0', () => {
    const products = [
      { name: 'Product 1', price: 100 },
      { name: 'Product 2', price: 50 }
    ];
    const discountPercentage = 0;
    const discountedProducts = calculateDiscountedPrice(
      products,
      discountPercentage
    );

    expect(discountedProducts).toEqual(products); // No discount applied
  });

  it('should handle discountPercentage = 100', () => {
    const products = [
      { name: 'Product 1', price: 100 },
      { name: 'Product 2', price: 50 }
    ];
    const discountPercentage = 100;
    const discountedProducts = calculateDiscountedPrice(
      products,
      discountPercentage
    );

    expect(discountedProducts).toEqual([
      { name: 'Product 1', price: 0 },
      { name: 'Product 2', price: 0 }
    ]);
  });
});

describe('calculateTotalPrice', () => {
  it('should calculate the total price of all products', () => {
    const products = [
      { name: 'Product 1', price: 100 },
      { name: 'Product 2', price: 50 },
      { name: 'Product 3', price: 75 }
    ];
    const totalPrice = calculateTotalPrice(products);

    expect(totalPrice).toBe(225);
  });

  it('should handle an empty array of products', () => {
    const products = [];
    const totalPrice = calculateTotalPrice(products);

    expect(totalPrice).toBe(0);
  });

  it('should handle products with price 0', () => {
    const products = [
      { name: 'Product 1', price: 0 },
      { name: 'Product 2', price: 0 }
    ];
    const totalPrice = calculateTotalPrice(products);

    expect(totalPrice).toBe(0);
  });
});

// Task 2: Function Composition and Point-Free Style

describe('getFullName', () => {
  it('should return the full name', () => {
    const person = { firstName: 'John', lastName: 'Doe' };
    const fullName = getFullName(person);

    expect(fullName).toBe('John Doe');
  });

  it('should handle empty first name and last name', () => {
    const person = { firstName: '', lastName: '' };
    const fullName = getFullName(person);

    expect(fullName).toBe(' ');
  });

  it('should capitalize the first letters', () => {
    const person = { firstName: 'jOHN', lastName: 'dOE' };
    const fullName = getFullName(person);

    expect(fullName).toBe('John Doe');
  });
});

describe('filterUniqueWords', () => {
  it('should return an array of unique words sorted alphabetically', () => {
    const text = 'hello world world again';
    const uniqueWords = filterUniqueWords(text);

    expect(uniqueWords).toEqual(['again', 'hello', 'world']);
  });

  it('should handle an empty string', () => {
    const text = '';
    const uniqueWords = filterUniqueWords(text);

    expect(uniqueWords).toEqual([]);
  });

  it('should handle a string with only one word', () => {
    const text = 'hello';
    const uniqueWords = filterUniqueWords(text);

    expect(uniqueWords).toEqual(['hello']);
  });
});

describe('getAverageGrade', () => {
  it('should calculate the average grade of all students', () => {
    const students = [
      { name: 'John', grades: [80, 90, 70] },
      { name: 'Jane', grades: [85, 95, 90] },
      { name: 'Bob', grades: [75, 85, 80] }
    ];
    const averageGrade = getAverageGrade(students);

    expect(averageGrade).toBe(83.33333333333333); // Approximately 83.33
  });

  it('should handle students with no grades', () => {
    const students = [
      { name: 'John', grades: [] },
      { name: 'Jane', grades: [] }
    ];
    const averageGrade = getAverageGrade(students);

    expect(averageGrade).toBe(NaN); // Since there are no grades
  });

  it('should handle an empty array of students', () => {
    const students = [];
    const averageGrade = getAverageGrade(students);

    expect(averageGrade).toBe(NaN); // Since there are no grades
  });
});

// Task 3: Closures and Higher-Order Functions

describe('createCounter', () => {
  it('should create a counter that increments independently', () => {
    const counter1 = createCounter();
    const counter2 = createCounter();

    expect(counter1()).toBe(1);
    expect(counter1()).toBe(2);
    expect(counter2()).toBe(1);
    expect(counter1()).toBe(3);
  });
});
