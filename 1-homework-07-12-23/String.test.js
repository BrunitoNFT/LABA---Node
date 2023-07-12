const StrPlus = require('./index');

const str = new StrPlus('20');

describe('Plus, Minus, Multiply and Divide operations. ', () => {
  test('Plus: 20 + 30 to equal 50', () => {
    expect(str.plus('30')).toBe('50');
  });

  test('Minus: 20 - 10 to equal 10', () => {
    expect(str.minus('10')).toBe('10');
  });

  test('Multiply: 20 * 10 to equal 200', () => {
    expect(str.multiply('10')).toBe('200');
  });

  test('Divide: 20 / 10 to equal 2', () => {
    expect(str.divide('10')).toBe('2');
  });
});
