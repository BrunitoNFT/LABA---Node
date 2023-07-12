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

String.prototype.plus = function(numTwoStr) {
  return String(parseInt(this) + parseInt(numTwoStr));
};

String.prototype.minus = function(numTwoStr) {
  return String(parseInt(this) - parseInt(numTwoStr));
};

String.prototype.divide = function(numTwoStr) {
  return String(parseInt(this) / parseInt(numTwoStr));
};

String.prototype.multiply = function(numTwoStr) {
  return String(parseInt(this) * parseInt(numTwoStr));
};

module.exports = String;
