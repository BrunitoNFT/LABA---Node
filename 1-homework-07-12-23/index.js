'\nHomework:\nPerform arithmetic operations on strings without relying on bigint or arithmetic libraries. The operations should function as string functions, considering only positive integers (you can avoid negative numbers, all numbers will be positive and integer).\nString.plus(string) => string\nString.minus(string) => string\nString.divide(string) => string\nString.multiply(string) => string\n';

String.prototype.plus = function(numTwoStr) {
  return String(parseInt(this, 10) + parseInt(numTwoStr, 10));
};
String.prototype.minus = function(numTwoStr) {
  return String(parseInt(this, 10) - parseInt(numTwoStr, 10));
};
String.prototype.divide = function(numTwoStr) {
  return String(parseInt(this, 10) / parseInt(numTwoStr, 10));
};
String.prototype.multiply = function(numTwoStr) {
  return String(parseInt(this, 10) * parseInt(numTwoStr, 10));
};
module.exports = String;
