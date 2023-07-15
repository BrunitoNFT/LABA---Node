'\nHomework:\nPerform arithmetic operations on strings without relying on bigint or arithmetic libraries. The operations should function as string functions, considering only positive integers (you can avoid negative numbers, all numbers will be positive and integer).\nString.plus(string) => string\nString.minus(string) => string\nString.divide(string) => string\nString.multiply(string) => string\n';
String.prototype.plus = function(numTwoStr) {
  var numOne = this.split('').reverse();
  var numTwo = numTwoStr.split('').reverse();
  var result = [];
  var carry = 0;
  var i = 0;
  while (i < numOne.length || i < numTwo.length || carry > 0) {
    var digitOne = i < numOne.length ? parseInt(numOne[i]) : 0;
    var digitTwo = i < numTwo.length ? parseInt(numTwo[i]) : 0;
    var sum = digitOne + digitTwo + carry;
    var digitSum = sum % 10;
    carry = Math.floor(sum / 10);
    result.push(String(digitSum));
    i++;
  }
  return result.reverse().join('');
};
String.prototype.minus = function(numTwoStr) {
  var numOne = this.split('').reverse();
  var numTwo = numTwoStr.split('').reverse();
  var result = [];
  var borrow = 0;
  var i = 0;
  while (i < numOne.length || i < numTwo.length) {
    var digitOne = i < numOne.length ? parseInt(numOne[i]) : 0;
    var digitTwo = i < numTwo.length ? parseInt(numTwo[i]) : 0;
    var diff = digitOne - borrow - digitTwo;
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
String.prototype.divide = function(numTwoStr) {
  var dividend = this;
  var divisor = numTwoStr;
  var quotient = '';
  var remainder = '';
  for (var i = 0; i < dividend.length; i++) {
    remainder += dividend[i];
    var count = 0;
    while (parseInt(remainder) >= parseInt(divisor)) {
      remainder = (parseInt(remainder) - parseInt(divisor)).toString();
      count++;
    }
    quotient += count.toString();
  }
  // Trim leading zeros from the quotient
  quotient = quotient.replace(/^0+/, '');
  // If the quotient is empty, the result is '0'
  if (quotient === '') {
    quotient = '0';
  }
  return quotient;
};
String.prototype.multiply = function(numTwoStr) {
  var numOne = this;
  var numTwo = numTwoStr;
  if (numOne === '0' || numTwo === '0') {
    return '0';
  }
  var product = Array(numOne.length + numTwo.length).fill(0);
  for (var i = numOne.length - 1; i >= 0; i--) {
    var digitOne = parseInt(numOne[i]);
    var carry = 0;
    for (var j = numTwo.length - 1; j >= 0; j--) {
      var digitTwo = parseInt(numTwo[j]);
      var partialProduct = digitOne * digitTwo + carry + product[i + j + 1];
      carry = Math.floor(partialProduct / 10);
      product[i + j + 1] = partialProduct % 10;
    }
    product[i] += carry;
  }
  var result = product.join('').replace(/^0+/, '');
  return result;
};
module.exports = String;
