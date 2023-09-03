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
    return __awaiter(this, void 0, void 0, function* () {
        let newArr = [];
        for (let i = 0; i < arrayOfPromises.length; i++) {
            newArr.push(yield arrayOfPromises[i]);
        }
        return newArr;
    });
}
function promiseAllSettled(arrayOfPromises) {
    return __awaiter(this, void 0, void 0, function* () {
        let newArr = [];
        for (let i = 0; i < arrayOfPromises.length; i++) {
            newArr.push(yield arrayOfPromises[i]
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
            }));
        }
        return newArr;
    });
}
function chainPromises(arrayOfFunctionsWithPromises) {
    return __awaiter(this, void 0, void 0, function* () {
        let cont = 0;
        function promiseBucle(parameter) {
            return __awaiter(this, void 0, void 0, function* () {
                if (cont == arrayOfFunctionsWithPromises.length - 1) {
                    let ans = yield arrayOfFunctionsWithPromises[cont](parameter ? parameter : '');
                    return ans;
                }
                else {
                    const res = yield arrayOfFunctionsWithPromises[cont](parameter ? parameter : '');
                    cont++;
                    return yield promiseBucle(res);
                }
            });
        }
        let finalAns = yield promiseBucle();
        return finalAns;
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
