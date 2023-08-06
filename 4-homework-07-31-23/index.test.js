const functions = require('./index.js');

// Task 1: Object Property Manipulation
describe('Task 1: Object Property Manipulation', () => {
  test('Properties of person should be read-only and non-writable', () => {
    expect(
      Object.getOwnPropertyDescriptor(functions.person, 'firstName').writable
    ).toBe(false);
    expect(
      Object.getOwnPropertyDescriptor(functions.person, 'lastName').writable
    ).toBe(false);
    expect(
      Object.getOwnPropertyDescriptor(functions.person, 'age').writable
    ).toBe(false);
    expect(
      Object.getOwnPropertyDescriptor(functions.person, 'email').writable
    ).toBe(false);
  });

  test('updateInfo should update properties correctly', () => {
    const newInfo = {
      firstName: 'Jane',
      age: 32
    };
    functions.person.updateInfo(newInfo);
    expect(functions.person.firstName).toBe('John'); // firstName is read-only, so it should remain unchanged
    expect(functions.person.age).toBe(30); // age is read-only, so it should remain unchanged
    expect(functions.person.email).toBe('john.doe@example.com'); // email is read-only, so it should remain unchanged
    expect(functions.person.lastName).toBe('Doe'); // lastName is read-only, so it should remain unchanged

    expect(functions.person.address).toEqual({}); // address is writable, so it should be updated
  });

  test('address property should be non-enumerable and non-configurable', () => {
    expect(
      Object.getOwnPropertyDescriptor(functions.person, 'address').enumerable
    ).toBe(false);
    expect(
      Object.getOwnPropertyDescriptor(functions.person, 'address').configurable
    ).toBe(false);
  });
});

// Task 2: Object Property Enumeration and Deletion
describe('Task 2: Object Property Enumeration and Deletion', () => {
  test('getTotalPrice should calculate total price correctly', () => {
    const product = {
      name: 'Laptop',
      price: 1000,
      quantity: 5
    };
    const totalPrice = functions.getTotalPrice(product);
    expect(totalPrice).toBe(5000); // price * quantity = 1000 * 5 = 5000
  });

  test('deleteNonConfigurable should delete property if configurable', () => {
    const obj = {
      prop1: 'value1',
      prop2: 'value2'
    };
    functions.deleteNonConfigurable(obj, 'prop1');
    expect(obj).not.toHaveProperty('prop1');
  });

  test('deleteNonConfigurable should throw error for non-configurable property', () => {
    const obj = {};
    Object.defineProperty(obj, 'prop', {
      value: 'value',
      configurable: false
    });
    expect(() => functions.deleteNonConfigurable(obj, 'prop')).toThrow(
      "Cannot delete non-configurable property 'prop'."
    );
    expect(obj).toHaveProperty('prop'); // Property 'prop' should still exist
  });
});

// Task 3: Object Property Getters and Setters
describe('Task 3: Object Property Getters and Setters', () => {
  test('formattedBalance getter should return balance with currency symbol', () => {
    expect(functions.bankAccount.formattedBalance).toBe('$1000'); // Default balance is 1000
  });

  test('balance setter should update account balance and formattedBalance', () => {
    functions.bankAccount.balance = 1500;
    expect(functions.bankAccount.formattedBalance).toBe('$1500'); // Balance has been updated
  });

  test('transfer should correctly transfer amount between accounts', () => {
    const targetAccount = {
      _balance: 500,
      get formattedBalance() {
        return `$${this._balance}`;
      },
      set balance(amount) {
        if (typeof amount !== 'number' || amount < 0) {
          throw new Error('Amount should be a positive number.');
        }
        this._balance = amount;
      }
    };

    functions.bankAccount.transfer(targetAccount, 500);
    expect(functions.bankAccount.formattedBalance).toBe('$1000'); // Source account balance after transfer
    expect(targetAccount.formattedBalance).toBe('$1000'); // Target account balance after transfer
  });
});

// Task 4: Advanced Property Descriptors
describe('Task 4: Advanced Property Descriptors', () => {
  test('createImmutableObject should create a new immutable object', () => {
    const mutableObject = {
      prop1: 'value1',
      prop2: 'value2',
      nested: {
        prop3: 'value3'
      }
    };
    const immutableObject = functions.createImmutableObject(mutableObject);

    expect(immutableObject).toEqual(mutableObject);
    immutableObject.prop1 = 'new value'; // Attempt to modify a property, should throw an error
    expect(immutableObject.prop1).toBe('value1');
    immutableObject.nested.prop3 = 'new value'; // Attempt to modify a nested property, should throw an error
    expect(immutableObject.nested.prop3).toBe('value3');
  });
});

// Task 5: Object Observation
describe('observeObject function', () => {
  it('should observe property access', () => {
    const person4 = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    };

    const logs = [];
    function logPropertyChange(property, action) {
      logs.push(
        `Property '${property}' was ${
          action === 'get' ? 'accessed' : 'modified'
        }.`
      );
    }

    const observedPerson = functions.observeObject(person4, logPropertyChange);
    observedPerson.firstName;
    observedPerson.lastName;
    observedPerson.age;

    expect(logs).toEqual([
      "Property 'firstName' was accessed.",
      "Property 'lastName' was accessed.",
      "Property 'age' was accessed."
    ]);
  });

  it('should observe property modification', () => {
    const person4 = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    };

    const logs = [];
    function logPropertyChange(property, action) {
      logs.push(
        `Property '${property}' was ${
          action === 'get' ? 'accessed' : 'modified'
        }.`
      );
    }

    const observedPerson = functions.observeObject(person4, logPropertyChange);
    observedPerson.firstName = 'Jane';
    observedPerson.lastName = 'Smith';
    observedPerson.age = 31;

    expect(logs).toEqual([
      "Property 'firstName' was modified.",
      "Property 'lastName' was modified.",
      "Property 'age' was modified."
    ]);
  });

  it('should throw TypeError if the object to observe is not an actual object', () => {
    const logs = [];
    function logPropertyChange(property, action) {
      logs.push(
        `Property '${property}' was ${
          action === 'get' ? 'accessed' : 'modified'
        }.`
      );
    }

    expect(() => {
      functions.observeObject(null, logPropertyChange);
    }).toThrow(TypeError('Object to observe must be an actual object.'));

    expect(() => {
      functions.observeObject('invalid', logPropertyChange);
    }).toThrow(TypeError('Object to observe must be an actual object.'));

    expect(() => {
      functions.observeObject(123, logPropertyChange);
    }).toThrow(TypeError('Object to observe must be an actual object.'));
  });
});

// Task 6: Object Deep Cloning
describe('Task 6: Object Deep Cloning', () => {
  test('deepCloneObject should create a deep clone without circular references', () => {
    const obj1 = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA'
      }
    };
    obj1.self = obj1; // Circular reference
    const clonedObj = functions.deepCloneObject(obj1);
    expect(clonedObj).toEqual(obj1);
    expect(clonedObj).not.toBe(obj1);
    expect(clonedObj.address).not.toBe(obj1.address);
  });
});

// Task 7: Object Property Validation
describe('Task 7: Object Property Validation', () => {
  test('validateObject should validate object properties against schema', () => {
    const person1 = {
      name: 'John',
      age: 25
    };
    const person2 = {
      name: 'Jane',
      age: 17
    };

    const customSchema = {
      name: value => typeof value === 'string',
      age: value => typeof value === 'number' && value >= 18
    };

    expect(functions.validateObject(person1, customSchema)).toBe(true); // person1 satisfies the schema
    expect(functions.validateObject(person2, customSchema)).toBe(false); // person2 does not satisfy the schema
  });
});
