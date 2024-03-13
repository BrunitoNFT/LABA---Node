"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function promiseAll(arrayOfPromises) {
    return new Promise((resolve, reject) => {
        const results = [];
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
function promiseAllSettled(arrayOfPromises) {
    return new Promise(resolve => {
        let results = [];
        let counterOfResults = 0;
        arrayOfPromises.forEach((promise, index) => {
            promise
                .then(res => {
                results[index] = { status: 'fullfilled', value: res };
                counterOfResults++;
            })
                .catch((err) => {
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
function chainPromises(arrayOfFunctionsWithPromises) {
    return __awaiter(this, void 0, void 0, function* () {
        let nextArg = undefined;
        let funcIterable = 0;
        function iterateOverFuncArr(resolve) {
            arrayOfFunctionsWithPromises[funcIterable](nextArg).then(res => {
                nextArg = res;
                funcIterable++;
                if (funcIterable < arrayOfFunctionsWithPromises.length) {
                    return iterateOverFuncArr(resolve);
                }
                else {
                    resolve(nextArg);
                }
            });
        }
        return new Promise(resolve => {
            iterateOverFuncArr(resolve);
        });
    });
}
function promisify(callbackStyleFunction) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            callbackStyleFunction(...args, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
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
