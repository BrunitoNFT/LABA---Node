`Your task is to create a JavaScript library that provides advanced data transformation functions. The library should include the following features:
addValues: Accepts two arguments of any type and performs the appropriate addition operation based on the types of the arguments. The function should return the result of the addition. If the addition is not possible, it should throw an error.
stringifyValue: Accepts a single argument of any type and converts it to a string representation. For objects and arrays, use JSON.stringify() for serialization. For other types, use the appropriate built-in methods or operations to convert them to strings.
invertBoolean: Accepts a single boolean argument and returns its inverted value. If the argument is not a boolean, it should throw an error.
convertToNumber: Accepts a single argument of any type and attempts to convert it to a number. For strings, use parseFloat() or parseInt() for conversion. For other types, use appropriate operations or functions to perform the conversion. If the conversion is not possible, it should throw an error.
coerceToType: Accepts two arguments: value and type. It attempts to convert the value to the specified type using type coercion. The function should return the coerced value if successful. If the coercion is not possible, it should throw an error.
Implement additional functions of your choice that demonstrate advanced type conversion scenarios or cater to specific use cases related to primitive types. You are encouraged to explore complex scenarios and push the limits of type conversion.`;

function addValues(arg1, arg2) {
  const areNumbers =
    typeof arg1 === 'number' &&
    typeof arg2 === 'number' &&
    !isNaN(arg1) &&
    !isNaN(arg2);

  const areStrings = typeof arg1 === 'string' && typeof arg2 === 'string';

  if (areNumbers || areStrings) {
    return arg1 + arg2;
  } else {
    throw new Error('Addition is not possible for the given types.');
  }
}

/* function stringifyValue(arg) {
  // Handle null and undefined.
  if (arg === null || typeof arg === 'undefined') {
    return String(arg);
  }

  // Handle objects and arrays.
  if (typeof arg === 'object') {
    if (Array.isArray(arg)) {
      // Handle arrays.
      return `[${arg.map(stringifyValue).join(',')}]`;
    } else if (arg instanceof Date) {
      // Handle Date objects.
      return `"${arg.toISOString()}"`;
    } else if (arg instanceof RegExp) {
      // Handle RegExp objects.
      return arg.toString();
    } else if (arg instanceof Error) {
      // Handle Error objects.
      return `{"error": "${arg.message}"}`;
    } else {
      // Handle plain objects and other special cases.
      const keys = Object.keys(arg);
      return `{${keys
        .map(key => `"${key}":${stringifyValue(arg[key])}`)
        .join(',')}}`;
    }
  }

  // For all other types, use their default string representation.
  return String(arg);
} */

function stringifyValue(arg) {
  // Handle null and undefined.
  if (arg === null || typeof arg === 'undefined') {
    return String(arg);
  }

  // Keep track of objects to detect circular references.
  const visitedObjects = new Set();

  // Helper function to recursively stringify objects and arrays.
  function stringifyRecursive(value) {
    if (typeof value === 'object' && value !== null) {
      // Check for circular reference.
      if (visitedObjects.has(value)) {
        throw new Error('Circular reference detected.');
      }

      visitedObjects.add(value);

      if (Array.isArray(value)) {
        // Handle arrays.
        const elements = value.map(stringifyRecursive);
        visitedObjects.delete(value);
        return `[${elements.join(',')}]`;
      } else if (value instanceof Date) {
        // Handle Date objects.
        const isoString = value.toISOString();
        visitedObjects.delete(value);
        return `"${isoString}"`;
      } else if (value instanceof RegExp) {
        // Handle RegExp objects.
        const regexString = value.toString();
        visitedObjects.delete(value);
        return regexString;
      } else if (value instanceof Error) {
        // Handle Error objects.
        const errorObj = { error: value.message };
        visitedObjects.delete(value);
        return `{${stringifyRecursive(errorObj)}}`;
      } else {
        // Handle plain objects and other special cases.
        const keys = Object.keys(value);
        const elements = keys.map(
          key => `"${key}":${stringifyRecursive(value[key])}`
        );
        visitedObjects.delete(value);
        return `{${elements.join(',')}}`;
      }
    }

    // For all other types, use their default string representation.
    return String(value);
  }

  return stringifyRecursive(arg);
}

function invertBoolean(arg) {
  if (typeof arg === 'boolean') {
    return !arg;
  } else {
    throw new Error('Inversion is only possible for a boolean value.');
  }
}

function convertToNumber(arg) {
  if (typeof arg === 'string') {
    // Handle empty strings.
    if (arg.trim() === '') {
      throw new Error('Empty strings are not possible to convert.');
    }

    if (arg.endsWith('n')) {
      let bigNum = BigInt(arg);
      if (isNaN(bigNum)) {
        throw new Error(
          'Conversion to bigint is not possible for the given string.'
        );
      } else {
        return bigNum;
      }
    }

    const numberValue = parseFloat(arg);
    if (isNaN(numberValue)) {
      throw new Error(
        'Coercion to number is not possible for the given value.'
      );
    } else {
      return numberValue;
    }
  } else if (typeof arg === 'boolean') {
    return arg ? 1 : 0;
  } else if (typeof arg === 'object' && arg !== null) {
    throw new Error('Conversion to number is not possible for objects.');
  } else {
    const numberValue = Number(arg);

    // Handle Infinity and -Infinity.
    if (numberValue === Infinity || numberValue === -Infinity) {
      throw new Error(
        'Conversion to number is not possible for Infinity or -Infinity.'
      );
    }

    // Handle NaN.
    if (isNaN(numberValue)) {
      throw new Error(
        'Conversion to number is not possible for the given value.'
      );
    } else {
      return numberValue;
    }
  }
}

function coerceToType(value, type) {
  if (typeof value === type) {
    return value;
  }

  switch (type) {
    case 'string':
      return this.stringifyValue(value);
    case 'number':
      return this.convertToNumber(value);
    case 'boolean':
      if (typeof value === 'string') {
        const lowercaseValue = value.toLowerCase();
        if (lowercaseValue === 'true') {
          return true;
        } else if (lowercaseValue === 'false') {
          return false;
        } else {
          throw new Error(
            'Coercion to boolean is not possible for the given value.'
          );
        }
      } else {
        throw new Error(
          'Coercion to boolean is not possible for the given value.'
        );
      }
    default:
      throw new Error(
        `Coercion to ${type} is not possible for the given value.`
      );
  }
}

function concatenateArrays(...args) {
  let flattenedArray = [];
  args.forEach(arg => {
    if (Array.isArray(arg)) {
      flattenedArray.push(...arg); // Spread the elements of the array
    } else {
      flattenedArray.push(arg);
    }
  });
  return flattenedArray;
}

// Additional function: Find the minimum value in an array, converting non-numeric elements to numbers.
function findMinimumValue(...args) {
  let newArr = concatenateArrays(...args); // Use spread operator to pass individual arguments
  let minValue = Infinity;
  newArr.forEach(item => {
    let numberValue;
    try {
      numberValue = typeof item === 'number' ? item : convertToNumber(item);
      if (!isNaN(numberValue)) {
        minValue = Math.min(minValue, numberValue);
      }
    } catch (error) {}
  });
  return minValue;
}

module.exports = {
  addValues,
  stringifyValue,
  invertBoolean,
  convertToNumber,
  coerceToType,
  concatenateArrays,
  findMinimumValue
};
