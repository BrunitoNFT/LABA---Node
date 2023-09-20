const { HashTableClass } = require('./index.js');

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
