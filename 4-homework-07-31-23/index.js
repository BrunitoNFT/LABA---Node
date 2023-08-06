'use strict';
/* Homework 4, Deadline 07.08.2023
Task 1: Object Property Manipulation

Create an object called person with the following properties and

values:firstName: "John"
lastName: "Doe"
age: 30
email: "john.doe@example.com"

Use property descriptors to make all properties of the person object read-only and non-writable, so their values cannot be changed directly.

Implement a method called updateInfo on the person object that takes a new info object as an argument. The info object should contain updated values for any of the properties (e.g., { firstName: "Jane", age: 32 }). Ensure that this method adheres to the read-only property descriptor set earlier.

Create a new property called address on the person object with an initial value of an empty object. Make this property non-enumerable and non-configurable.

Task 2: Object Property Enumeration and Deletion

Create a new object called product with the following properties and values:
name: "Laptop"
price: 1000
quantity: 5
Use property descriptors to make the price and quantity properties non-enumerable and non-writable.

Implement a function called getTotalPrice that takes the product object as an argument and returns the total price (calculated as price * quantity). Ensure that the function accesses the non-enumerable properties directly using the Object.getOwnPropertyDescriptor method.

Implement a function called deleteNonConfigurable that takes an object and a property name as arguments. The function should delete the specified property from the object if it exists. If the property is non-configurable, throw an error with an appropriate message.

Task 3: Object Property Getters and Setters

Create an object called bankAccount with the following properties and values:balance: 1000 (default value)Use a getter to define a property called formattedBalance, which returns the balance with a currency symbol (e.g., "$1000").

Use a setter to define a property called balance, which updates the account balance and automatically updates the corresponding formattedBalance value.

Implement a method called transfer on the bankAccount object that takes two bankAccount objects and an amount as arguments. The method should transfer the specified amount from the current account to the target account. Ensure that the balance and formattedBalance properties of both accounts are updated correctly.

Task 4: Advanced Property Descriptors

Implement a function called createImmutableObject that takes an object as an argument and returns a new object with all its properties made read-only and non-writable using property descriptors. The function should handle nested objects and arrays recursively.

Use the createImmutableObject function to create an immutable version of the person object from Task 1.

Task 5: Object Observation

Implement a function called observeObject that takes an object and a callback function as arguments. The function should return a proxy object that wraps the original object and invokes the callback function whenever any property of the object is accessed or modified.

Use the observeObject function to create a proxy for the person object from Task 1. The callback function should log the property name and the action (get or set) performed on the object.

Task 6: Object Deep Cloning

Implement a function called deepCloneObject that takes an object as an argument and returns a deep copy of the object. The function should handle circular references and complex nested structures. Do not use JSON methods.

Task 7: Object Property Validation

Implement a function called validateObject that takes an object and a validation schema as arguments. The schema should define the required properties, their types, and any additional validation rules. The function should return true if the object matches the schema, and false otherwise. You can choose any schema you want

 */
// Task 1: Object Property Manipulation
let person = {};
Object.defineProperties(person, {
  firstName: {
    value: 'John',
    writable: false,
    configurable: false
  },
  lastName: {
    value: 'Doe',
    writable: false,
    configurable: false
  },
  age: {
    value: 30,
    writable: false,
    configurable: false
  },
  email: {
    value: 'john.doe@example.com',
    writable: false,
    configurable: false
  },
  address: {
    value: {},
    writable: true,
    enumerable: false,
    configurable: false
  }
});
person.updateInfo = function(newInfo) {
  Object.keys(newInfo).forEach(propertyName => {
    if (person.hasOwnProperty(propertyName)) {
      console.log(
        `Cannot update read-only property: ${propertyName}. Skipping...`
      );
    } else {
      person[propertyName] = newInfo[propertyName];
    }
  });
};
// Task 2: Object Property Enumeration and Deletion
const product = {};
Object.defineProperties(product, {
  name: {
    value: 'Laptop',
    writable: true,
    enumerable: true,
    configurable: true
  },
  price: {
    value: 1000,
    writable: false,
    enumerable: false,
    configurable: false
  },
  quantity: {
    value: 5,
    writable: false,
    enumerable: false,
    configurable: false
  }
});
function getTotalPrice(product) {
  const priceDescriptor = Object.getOwnPropertyDescriptor(product, 'price');
  const quantityDescriptor = Object.getOwnPropertyDescriptor(
    product,
    'quantity'
  );
  if (!priceDescriptor || !quantityDescriptor) {
    throw new Error('Price or quantity properties not found in the object.');
  }
  return priceDescriptor.value * quantityDescriptor.value;
}
function deleteNonConfigurable(obj, propertyName) {
  const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
  if (!propertyDescriptor) {
    throw new Error(`Property '${propertyName}' not found in the object.`);
  }
  if (!propertyDescriptor.configurable) {
    throw new Error(
      `Cannot delete non-configurable property '${propertyName}'.`
    );
  }
  delete obj[propertyName];
}
// Task 3: Object Property Getters and Setters
const bankAccount = {
  _balance: 1000,
  get formattedBalance() {
    return `$${this._balance}`;
  },
  set balance(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Amount should be a positive number.');
    }
    this._balance = amount;
  },
  transfer(targetAccount, amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Amount should be a positive number.');
    }
    if (amount > this._balance) {
      throw new Error('Insufficient balance for the transfer.');
    }
    this._balance -= amount;
    targetAccount._balance += amount;
  }
};
// Task 4: Advanced Property Descriptors
function createImmutableObject(obj, clones = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (clones.has(obj)) {
    return clones.get(obj);
  }
  const clone = Array.isArray(obj) ? [] : {};
  clones.set(obj, clone);
  Object.keys(obj).forEach(key => {
    clone[key] = createImmutableObject(obj[key], clones);
  });
  return Object.freeze(clone);
}
// Task 5: Object Observation
function observeObject(obj, callback) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Object to observe must be an actual object.');
  }
  return new Proxy(obj, {
    get(target, property) {
      callback(property, 'get');
      return target[property];
    },
    set(target, property, value) {
      callback(property, 'set');
      target[property] = value;
      return true;
    }
  });
}
// Task 6: Object Deep Cloning
function deepCloneObject(obj, clones = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (clones.has(obj)) {
    return clones.get(obj);
  }
  const clone = Array.isArray(obj) ? [] : {};
  clones.set(obj, clone);
  Object.keys(obj).forEach(key => {
    clone[key] = deepCloneObject(obj[key], clones);
  });
  return clone;
}
function validateObject(obj, schema) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  for (const key in schema) {
    if (obj.hasOwnProperty(key)) {
      const validationFn = schema[key];
      const value = obj[key];
      if (!validationFn(value)) {
        return false;
      }
    }
  }
  return true;
}
module.exports = {
  person,
  getTotalPrice,
  deleteNonConfigurable,
  bankAccount,
  createImmutableObject,
  observeObject,
  deepCloneObject,
  validateObject
};
