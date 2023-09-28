"use strict";
const dateRegEx = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.([0-9]{3})Z$/;
const tokenizer = /({|}|[|]|,|:|true|false|null|undefined|"[^"]*"|-?\d+(\.\d+)?|\[|\])|\S+/g;
function myJSONParse(jsonString) {
    // Tokenization way 1
    const tokens = jsonString.match(tokenizer);
    const stackPosition = [];
    let currentKey = null;
    for (let index = 0; index < tokens.length; index++) {
        const token = tokens[index];
        if (token.match(/^\{$/)) {
            let newObj = {};
            if (currentKey !== null) {
                stackPosition[stackPosition.length - 1][currentKey] = newObj; //  We conect  the key with the nested obj
                currentKey = null;
            }
            else if (Array.isArray(stackPosition[stackPosition.length - 1])) {
                stackPosition[stackPosition.length - 1].push(newObj);
            }
            else if (tokens[index - 1] && tokens[index - 1].match(/^\{$/)) {
                throw new Error('The syntax of the incoming JSON string is WRONG.');
            }
            stackPosition.push(newObj); // We keep track of the last obj
            continue;
        }
        else if (token.match(/^\}$/)) {
            if (stackPosition.length === 1) {
                return stackPosition[0];
            }
            else {
                stackPosition.pop();
            }
            continue;
        }
        else if (token.match(/^\[$/)) {
            let newArr = [];
            if (currentKey !== null) {
                stackPosition[stackPosition.length - 1][currentKey] = newArr; //  We conect  the key with the nested arr
                currentKey = null;
            }
            else if (Array.isArray(stackPosition[stackPosition.length - 1])) {
                stackPosition[stackPosition.length - 1].push(newArr);
            }
            stackPosition.push(newArr);
            continue;
        }
        else if (token.match(/^\]$/)) {
            if (stackPosition.length === 1) {
                return stackPosition[0];
            }
            else {
                stackPosition.pop();
            }
            continue;
        }
        else if (token.match(/^,$/)) {
            continue;
        }
        else if (token.match(/^"/)) {
            const keyOrValue = token.slice(1, -1);
            if (currentKey === null &&
                tokens[index - 1].match(/^[\{\,]$/) &&
                !Array.isArray(stackPosition[stackPosition.length - 1])) {
                // We have a new key
                currentKey = keyOrValue;
                if (tokens[index + 1] === ':') {
                    index++;
                }
                else {
                    throw new Error('Syntax error. The next item of a key is not a colon.');
                }
                continue; // We don't need to do more things in this iteration
            }
        }
        // The token was not matched by previous symbols
        if (stackPosition.length > 0) {
            if (Array.isArray(stackPosition[stackPosition.length - 1])) {
                stackPosition[stackPosition.length - 1].push(parserData(token));
                continue;
            }
            else {
                if (currentKey) {
                    stackPosition[stackPosition.length - 1][currentKey] = parserData(token);
                    currentKey = null;
                    continue;
                }
                else {
                    throw new Error("The current key doesen't exist: " +
                        currentKey +
                        ' And the token is: ' +
                        token);
                }
            }
        }
        if (tokens.length === 1) {
            return parserData(token);
        }
        throw new Error('Nothing catch the token, token: ' + token);
    }
    throw new Error('The syntax of the incoming JSON string is WRONG.');
}
function parserData(token) {
    if (token.match(/^(-?\d+)$/)) {
        return parseInt(token);
    }
    else if (token.match(/^"/)) {
        let str = token.slice(1, -1);
        if (str.match(dateRegEx)) {
            return new Date(str); // Date
        }
        return str;
    }
    else if (token.match(/-?\d+(\.\d+)$/)) {
        return parseFloat(token);
    }
    else if (token.match(/^(true)$/)) {
        return true;
    }
    else if (token.match(/^(false)$/)) {
        return false;
    }
    else if (token.match(/^(null)$/)) {
        return null;
    }
    else if (token.match(/^(undefined)$/)) {
        return undefined;
    }
    throw new Error('The syntax of the incoming JSON string is WRONG.');
}
module.exports = { myJSONParse };
