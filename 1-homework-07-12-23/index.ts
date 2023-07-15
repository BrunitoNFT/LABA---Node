`
Homework:
Perform arithmetic operations on strings without relying on bigint or arithmetic libraries. The operations should function as string functions, considering only positive integers (you can avoid negative numbers, all numbers will be positive and integer).
String.plus(string) => string
String.minus(string) => string
String.divide(string) => string
String.multiply(string) => string
`;

interface String {
  plus: (numTwoStr: string) => string;
  minus: (numTwoStr: string) => string;
  divide: (numTwoStr: string) => string;
  multiply: (numTwoStr: string) => string;
}

String.prototype.plus = function(numTwoStr: string): string {
  const numOne = this.split('').reverse();
  const numTwo = numTwoStr.split('').reverse();

  const result: String[] = [];
  let carry = 0;
  let i = 0;

  while (i < numOne.length || i < numTwo.length || carry > 0) {
    const digitOne = i < numOne.length ? parseInt(numOne[i]) : 0;
    const digitTwo = i < numTwo.length ? parseInt(numTwo[i]) : 0;

    const sum = digitOne + digitTwo + carry;
    const digitSum = sum % 10;
    carry = Math.floor(sum / 10);

    result.push(String(digitSum));
    i++;
  }

  return result.reverse().join('');
};

String.prototype.minus = function(numTwoStr: string): string {
  const numOne = this.split('').reverse();
  const numTwo = numTwoStr.split('').reverse();

  const result: String[] = [];
  let borrow = 0;
  let i = 0;

  while (i < numOne.length || i < numTwo.length) {
    const digitOne = i < numOne.length ? parseInt(numOne[i]) : 0;
    const digitTwo = i < numTwo.length ? parseInt(numTwo[i]) : 0;

    let diff = digitOne - borrow - digitTwo;

    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    result.push(String(diff));
    i++;
  }

  return result.reverse().join('');
};

String.prototype.divide = function(numTwoStr: string): string {
  const dividend = this;
  const divisor = numTwoStr;

  let quotient = '';
  let remainder = '';

  for (let i = 0; i < dividend.length; i++) {
    remainder += dividend[i];
    let count = 0;

    while (parseInt(remainder) >= parseInt(divisor)) {
      remainder = (parseInt(remainder) - parseInt(divisor)).toString();
      count++;
    }

    quotient += count.toString();
  }

  quotient = quotient.replace(/^0+/, '');

  if (quotient === '') {
    quotient = '0';
  }

  return quotient;
};

String.prototype.multiply = function(numTwoStr: string): string {
  const numOne = this;
  const numTwo = numTwoStr;

  if (numOne === '0' || numTwo === '0') {
    return '0';
  }

  const product = Array(numOne.length + numTwo.length).fill(0);

  for (let i = numOne.length - 1; i >= 0; i--) {
    const digitOne = parseInt(numOne[i]);

    let carry = 0;

    for (let j = numTwo.length - 1; j >= 0; j--) {
      const digitTwo = parseInt(numTwo[j]);

      let partialProduct = digitOne * digitTwo + carry + product[i + j + 1];

      carry = Math.floor(partialProduct / 10);
      product[i + j + 1] = partialProduct % 10;
    }

    product[i] += carry;
  }

  const result = product.join('').replace(/^0+/, '');

  return result;
};

module.exports = String;
