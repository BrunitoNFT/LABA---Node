const {
  promiseAll,
  promiseAllSettled,
  chainPromises,
  promisify
} = require('./index');

describe('Promise test', () => {
  test('PromiseAll test', () => {
    const promises1 = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ];

    const promises2 = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.reject(4)
    ];

    promiseAll(promises1).then(results => {
      expect(results).toStrictEqual([1, 2, 3]);
    });

    promiseAll(promises2)
      .then()
      .catch(error => {
        expect(error).toBe(4);
      });

    const promises3 = [
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1);
        }, 1000);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(2);
        }, 1000);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(3);
        }, 1000);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(4);
        }, 1000);
      })
    ];

    const startTime = performance.now();

    promiseAll(promises3).then(results => {
      expect(results).toStrictEqual([1, 2, 3, 4]);
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;

      expect(results).toStrictEqual([1, 2, 3, 4]);
      expect(elapsedTime).toBeLessThanOrEqual(1100);
    });
  });

  test('promiseAllSettled test', () => {
    const promises = [
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1);
        }, 1000);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('Error occurred');
        }, 1000);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(3);
        }, 1000);
      })
    ];
    const startTime = performance.now();

    promiseAllSettled(promises).then(results => {
      const expectedResult = [
        { status: 'fulfilled', value: 1 },
        { status: 'rejected', reason: 'Error occurred' },
        { status: 'fulfilled', value: 3 }
      ];
      expect(results).toStrictEqual(expectedResult);
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;

      expect(elapsedTime).toBeLessThanOrEqual(1100);
    });
  });

  test('chainPromises test', () => {
    function asyncFunction1() {
      return Promise.resolve('Result from asyncFunction1');
    }

    function asyncFunction2(data) {
      return Promise.resolve(data + ' - Result from asyncFunction2');
    }

    function asyncFunction3(data) {
      return Promise.resolve(data + ' - Result from asyncFunction3');
    }

    const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

    chainPromises(functionsArray)
      .then(result => {
        expect(result).toBe(
          'Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3'
        );
      })
      .catch(error => {
        console.error('Chained promise error:', error);
      });
  });

  test('promisify test', () => {
    function callbackStyleFunction(value, callback) {
      setTimeout(() => {
        if (value > 0) {
          callback(null, value * 2);
        } else {
          callback('Invalid value', null);
        }
      }, 1000);
    }

    const promisedFunction = promisify(callbackStyleFunction);

    promisedFunction(3)
      .then(result => {
        expect(result).toBe(6);
      })
      .catch(error => {});
  });
});
