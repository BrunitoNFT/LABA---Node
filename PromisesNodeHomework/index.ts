function promiseAll(arrayOfPromises: Promise<any>[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    let counterOfResults = 0;

    arrayOfPromises.forEach((promise, index) => {
      promise
        .then(res => {
          counterOfResults++;
          results[index] = res;

          if (arrayOfPromises.length == counterOfResults) {
            resolve(results);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

function promiseAllSettled(arrayOfPromises: Promise<any>[]): Promise<any[]> {
  return new Promise(resolve => {
    let results: any[] = [];
    let counterOfResults = 0;

    arrayOfPromises.forEach((promise, index) => {
      promise
        .then(res => {
          results[index] = { status: 'fullfilled', value: res };
          counterOfResults++;
        })
        .catch((err: Error) => {
          results[index] = { status: 'rejected', reason: JSON.stringify(err) };
          counterOfResults++;
        })
        .finally(() => {
          if (counterOfResults === arrayOfPromises.length) {
            resolve(results);
          }
        });
    });
  });
}

async function chainPromises(
  arrayOfFunctionsWithPromises: ((arg1?: any) => Promise<any>)[]
) {
  let nextArg: unknown = undefined;
  let funcIterable: number = 0;
  function iterateOverFuncArr(resolve: (value: unknown) => void) {
    arrayOfFunctionsWithPromises[funcIterable](nextArg).then(res => {
      nextArg = res;
      funcIterable++;
      if (funcIterable < arrayOfFunctionsWithPromises.length) {
        return iterateOverFuncArr(resolve);
      } else {
        resolve(nextArg);
      }
    });
  }
  return new Promise(resolve => {
    iterateOverFuncArr(resolve);
  });
}

function promisify(callbackStyleFunction: Function) {
  return function(...args: any[]) {
    return new Promise((resolve, reject) => {
      callbackStyleFunction(...args, (error: null | string, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

module.exports = {
  promiseAll,
  promiseAllSettled,
  chainPromises,
  promisify
};
