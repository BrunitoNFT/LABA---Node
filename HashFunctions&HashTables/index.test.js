const {
  HashTableClass,
  HashTableClassArray,
  HashTableClassMapResizeHas,
  HashTableClassArrayResizeHas
} = require('./index.js');

describe('HashTableClass', () => {
  test('should set and get values correctly, including handling collisions', () => {
    const hashTable = new HashTableClass();

    // Adding key-value pairs to the hash table
    hashTable.set('name', 'Alice');
    hashTable.set('age', 25);
    hashTable.set('city', 'New York');

    // Retrieving values using the keys
    expect(hashTable.get('name')).toBe('Alice');
    expect(hashTable.get('age')).toBe(25);
    expect(hashTable.get('city')).toBe('New York');

    // Testing collision resolution by adding keys that produce the same hash index
    // Assuming 'ab' and 'ba' will hash to the same index with your current hash function
    hashTable.set('ab', 'value1');
    hashTable.set('ba', 'value2');

    // They should still be retrievable correctly despite the collision
    expect(hashTable.get('ab')).toBe('value1');
    expect(hashTable.get('ba')).toBe('value2');
  });

  test('should throw error when trying to get a non-existent key', () => {
    const hashTable = new HashTableClass();

    // Trying to get a value using a key that hasn't been added to the hash table
    expect(() => {
      hashTable.get('nonExistentKey');
    }).toThrowError(`The key nonExistentKey doesn't exist in the HASH TABLE`);
  });

  test('should allow deleting values and handle collisions correctly after deletion', () => {
    const hashTable = new HashTableClass();

    hashTable.set('name', 'Alice');
    hashTable.set('ab', 'value1');
    hashTable.set('ba', 'value2');

    // Deleting a key-value pair
    hashTable.delete('ab');

    // Trying to get the deleted key should throw an error
    expect(() => {
      hashTable.get('ab');
    }).toThrowError(`The key ab doesn't exist in the HASH TABLE`);

    // Other values, including those that collided with the deleted key, should still be retrievable
    expect(hashTable.get('name')).toBe('Alice');
    expect(hashTable.get('ba')).toBe('value2');
  });
});

describe('HashTable Performance Test array vs map', () => {
  test('Map-based HashTableClass performance', () => {
    const table = new HashTableClass(1000);
    const start = Date.now();

    for (let i = 0; i < 10000; i++) {
      table.set(`key${i}`, `value${i}`);
    }

    for (let i = 0; i < 10000; i++) {
      table.get(`key${i}`);
    }

    const duration = Date.now() - start;
    console.log(`Map-based HashTableClass took ${duration}ms`);
  });

  test('Array-based HashTableClassArray performance', () => {
    const table = new HashTableClassArray(1000);
    const start = Date.now();

    for (let i = 0; i < 10000; i++) {
      table.set(`key${i}`, `value${i}`);
    }

    for (let i = 0; i < 10000; i++) {
      table.get(`key${i}`);
    }

    const duration = Date.now() - start;
    console.log(`Array-based HashTableClassArray took ${duration}ms`);
  });
});

/*
Map-based HashTableClass took 129ms
Array-based HashTableClassArray took 89ms
*/

describe('HashTableClass functionality', () => {
  it('should resize the table correctly', () => {
    const hashTable = new HashTableClassMapResizeHas(3);
    hashTable.set('key1', 'value1');
    hashTable.set('key2', 'value2');

    expect(hashTable.size).toBe(3); // It should still be 3

    hashTable.set('key3', 'value3'); // This should trigger resizing
    expect(hashTable.size).toBe(6); // New size should be double of 3 = 6
    expect(hashTable.get('key1')).toBe('value1');
    expect(hashTable.get('key2')).toBe('value2');
    expect(hashTable.get('key3')).toBe('value3');
  });

  it('should correctly identify if a key exists', () => {
    const hashTable = new HashTableClassMapResizeHas(3);
    hashTable.set('key1', 'value1');

    expect(hashTable.has('key1')).toBe(true); // Since 'key1' was added, it should exist
    expect(hashTable.has('key2')).toBe(false); // 'key2' was never added, so it shouldn't exist
  });

  it('should handle the existence of keys regardless of their values', () => {
    const hashTable = new HashTableClassMapResizeHas(3);
    hashTable.set('key1', false); // Even though the value is a falsy value, the key exists
    hashTable.set('key2', 0); // Another falsy value

    expect(hashTable.has('key1')).toBe(true);
    expect(hashTable.has('key2')).toBe(true);
  });
});

describe('HashTableClassMapResizeHas', () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTableClassMapResizeHas();
  });

  it('should set and get a key-value pair', () => {
    hashTable.set('testKey', 'testValue');
    expect(hashTable.get('testKey')).toBe('testValue');
  });

  it('should handle collisions', () => {
    hashTable.set('a', 'valueA');
    hashTable.set('d', 'valueD'); // assuming the hash function causes a collision for keys 'a' and 'd'
    expect(hashTable.get('a')).toBe('valueA');
    expect(hashTable.get('d')).toBe('valueD');
  });

  it('should resize when exceeding load factor', () => {
    const spy = jest.spyOn(hashTable, 'resize');
    for (let i = 0; i < 4; i++) {
      hashTable.set(`key${i}`, `value${i}`);
    }
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should indicate if a key exists using has', () => {
    hashTable.set('existingKey', 'value');
    expect(hashTable.has('existingKey')).toBe(true);
    expect(hashTable.has('nonExistingKey')).toBe(false);
  });
});

describe('HashTableClassArrayResizeHas', () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTableClassArrayResizeHas();
  });

  it('should set and get a key-value pair', () => {
    hashTable.set('testKey', 'testValue');
    expect(hashTable.get('testKey')).toBe('testValue');
  });

  it('should handle collisions', () => {
    hashTable.set('a', 'valueA');
    hashTable.set('d', 'valueD'); // assuming the hash function causes a collision for keys 'a' and 'd'
    expect(hashTable.get('a')).toBe('valueA');
    expect(hashTable.get('d')).toBe('valueD');
  });

  it('should resize when exceeding load factor', () => {
    for (let i = 0; i < 4; i++) {
      hashTable.set(`key${i}`, `value${i}`);
    }
    expect(hashTable.size).toBeGreaterThan(3);
  });

  it('should indicate if a key exists using has', () => {
    hashTable.set('existingKey', 'value');
    expect(hashTable.has('existingKey')).toBe(true);
    expect(hashTable.has('nonExistingKey')).toBe(false);
  });
});

describe('Performance Comparison', () => {
  const NUM_ENTRIES = 10000; // adjust as needed
  const keys = [...Array(NUM_ENTRIES).keys()].map(String);

  it('performance of HashTableClassMapResizeHas', () => {
    const hashTable = new HashTableClassMapResizeHas();
    const start = jest.getRealSystemTime();

    keys.forEach((key, index) => {
      hashTable.set(key, `value${index}`);
    });

    keys.forEach(key => {
      hashTable.get(key);
    });

    const end = jest.getRealSystemTime();
    console.log(`HashTableClassMapResizeHas took ${end - start}ms`);
  });

  it('performance of HashTableClassArrayResizeHas', () => {
    const hashTable = new HashTableClassArrayResizeHas();
    const start = jest.getRealSystemTime();

    keys.forEach((key, index) => {
      hashTable.set(key, `value${index}`);
    });

    keys.forEach(key => {
      hashTable.get(key);
    });

    const end = jest.getRealSystemTime();
    console.log(`HashTableClassArrayResizeHas took ${end - start}ms`);
  });
});
