async function promiseAll(arrayOfPromises: Promise<any>[]): Promise<any[]> {
  let newArr = [];

  for (let i = 0; i < arrayOfPromises.length; i++) {
    newArr.push(await arrayOfPromises[i]);
  }
  return newArr;
}

async function promiseAllSettled(
  arrayOfPromises: Promise<any>[]
): Promise<any[]> {
  let newArr: any[] = [];
  for (let i = 0; i < arrayOfPromises.length; i++) {
    newArr.push(
      await arrayOfPromises[i]
        .then(result => {
          return {
            status: 'fulfilled',
            value: result
          };
        })
        .catch(error => {
          return {
            status: 'rejected',
            reason: error
          };
        })
    );
  }
  return newArr;
}

async function chainPromises(
  arrayOfFunctionsWithPromises: ((arg1?: any) => Promise<any>)[]
) {
  let cont = 0;
  async function promiseBucle(parameter?: Promise<any>): Promise<any> {
    if (cont == arrayOfFunctionsWithPromises.length - 1) {
      let ans = await arrayOfFunctionsWithPromises[cont](
        parameter ? parameter : ''
      );
      return ans;
    } else {
      const res = await arrayOfFunctionsWithPromises[cont](
        parameter ? parameter : ''
      );
      cont++;
      return await promiseBucle(res);
    }
  }
  let finalAns = await promiseBucle();
  return finalAns;
}

function promisify(callbackStyleFunction: Function) {
  return function(...args: any[]) {
    return new Promise((resolve, reject) => {
      callbackStyleFunction(...args, (error: Function, result: Function) => {
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
