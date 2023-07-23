const library = require('./index');

describe('addValues', () => {
  test('should add two numbers correctly', () => {
    expect(library.addValues(2, 3)).toBe(5);
  });

  test('should concatenate two strings correctly', () => {
    expect(library.addValues('hello', 'world')).toBe('helloworld');
  });

  test('should throw an error for incompatible types', () => {
    expect(() => library.addValues(2, 'hello')).toThrow(
      'Addition is not possible for the given types.'
    );
  });
});

describe('stringifyValue', () => {
  test('should stringify a number correctly', () => {
    expect(library.stringifyValue(42)).toBe('42');
  });

  test('should stringify an array correctly', () => {
    expect(library.stringifyValue([1, 2, 3])).toBe('[1,2,3]');
  });

  test('should throw an error for circular references', () => {
    const obj = { a: 1 };
    obj.b = obj;
    expect(() => library.stringifyValue(obj)).toThrow(
      Error('Circular reference detected.')
    );
  });
});

describe('invertBoolean', () => {
  test('should invert true to false', () => {
    expect(library.invertBoolean(true)).toBe(false);
  });

  test('should invert false to true', () => {
    expect(library.invertBoolean(false)).toBe(true);
  });

  test('should throw an error for non-boolean input', () => {
    expect(() => library.invertBoolean('hello')).toThrow(
      'Inversion is only possible for a boolean value.'
    );
  });
});

describe('convertToNumber', () => {
  test('should convert a valid number string to a number', () => {
    expect(library.convertToNumber('42')).toBe(42);
  });

  test('should convert a boolean true to number 1', () => {
    expect(library.convertToNumber(true)).toBe(1);
  });

  test('should throw an error for an empty string', () => {
    expect(() => library.convertToNumber('')).toThrow(
      'Empty strings are not possible to convert.'
    );
  });

  test('should handle Infinity correctly', () => {
    expect(() => library.convertToNumber(Infinity)).toThrow(
      'Conversion to number is not possible for Infinity or -Infinity.'
    );
  });
});

describe('coerceToType', () => {
  test('should correctly coerce a number to a string', () => {
    expect(library.coerceToType(42, 'string')).toBe('42');
  });

  test('should correctly coerce a boolean to a number', () => {
    expect(library.coerceToType(true, 'number')).toBe(1);
  });

  test('should correctly coerce a string "true" to a boolean true', () => {
    expect(library.coerceToType('true', 'boolean')).toBe(true);
  });

  test('should throw an error for unsupported coercion', () => {
    expect(() => library.coerceToType('hello', 'number')).toThrow(
      'Coercion to number is not possible for the given value.'
    );
  });
});

describe('concatenateArrays', () => {
  test('should concatenate multiple arrays correctly', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const arr3 = [7, 8, 9];
    expect(library.concatenateArrays(arr1, arr2, arr3)).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]);
  });

  test('should handle non-array inputs', () => {
    expect(library.concatenateArrays(1, 2, 3)).toEqual([1, 2, 3]);
    expect(library.concatenateArrays('hello', [2, 3])).toEqual(['hello', 2, 3]);
  });
});

describe('findMinimumValue', () => {
  test('should find the minimum value in an array', () => {
    expect(library.findMinimumValue(1, 5, 3, 2, 4)).toBe(1);
  });

  test('should handle arrays with non-numeric elements', () => {
    expect(library.findMinimumValue([1, 2, 3], 'hello', 'world', [4, 5])).toBe(
      1
    );
  });
});
