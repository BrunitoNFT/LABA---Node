const dateRegEx = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.([0-9]{3})Z$/;
const tokenizer = /({|}|[|]|,|:|true|false|null|undefined|"[^"]*"|-?\d+(\.\d+)?|\[|\])/g;

function myJSONParse(jsonString: string) {
  // Tokenization way 1
  const tokens: string[] = jsonString.match(tokenizer) as string[];

  console.log('tokens: ', tokens);

  /* 
  Tokenization way 2
  let match;
  while ((match = tokenizer.exec(jsonString))) {
    tokens.push(match[0]);
  } 
  */

  // Recursive function to parse tokens
  function parse(): any {
    if (!tokens || tokens.length < 1) {
      throw new Error('Unexpected behaviour of tokens.');
    }
    const token = tokens.shift();

    if (token === undefined) {
      throw new Error('Unexpected behaviour of tokens. The token is undefined');
    }

    if (token.match(/^\{$/)) {
      const obj: Record<string, any> = {};
      while (tokens[0] && tokens[0].match(/[^\}]/)) {
        if (tokens[0].match(/^,$/)) {
          tokens.shift(); // remove comma
        }
        let element = tokens.shift();
        if (element) {
          const key = element.slice(1, -1); // remove quotes from string
          tokens.shift(); // remove colon
          obj[key] = parse();
        } else {
          throw new Error('Element is undefined: ' + element);
        }
      }
      if (tokens[0] === undefined) {
        throw new Error('The syntax of the incoming JSON string is WRONG.');
      }
      tokens.shift(); // remove closing brace
      return obj;
    } else if (token.match(/^\[$/)) {
      const arr = [];
      while (tokens[0].match(/[^\]]/)) {
        if (tokens[0].match(/^,$/)) {
          tokens.shift(); // remove comma
        }
        let element = parse();
        arr.push(element);
      }
      tokens.shift(); // remove closing bracket
      return arr;
    } else if (token.match(/^"/)) {
      const ma = token.slice(1, -1);
      if (ma.match(dateRegEx)) {
        return new Date(ma); // Date
      }
      return ma; // return string without quotes
    } else if (token.match(/^(-?\d+)$/)) {
      return parseInt(token);
    } else if (token.match(/-?\d+(\.\d+)$/)) {
      return parseFloat(token);
    } else if (token.match(/^(true)$/)) {
      return true;
    } else if (token.match(/^(false)$/)) {
      return false;
    } else if (token.match(/^(null)$/)) {
      return null;
    } else if (token.match(/^(undefined)$/)) {
      return undefined;
    }
    throw new Error('The syntax of the incoming JSON string is WRONG.');
  }

  return parse();
}

module.exports = { myJSONParse };
