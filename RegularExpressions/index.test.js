const { myJSONParse } = require('./index.js');

describe('myJSONParse function', () => {
  test('should parse basic JSON string correctly', () => {
    const json = '{"key": "value", "num": 123}';
    expect(myJSONParse(json)).toEqual({ key: 'value', num: 123 });
  });

  test('should parse date strings into Date objects', () => {
    const json = '{"date":"2023-09-26T15:01:26.553Z"}';
    const result = myJSONParse(json);
    expect(result.date instanceof Date).toBeTruthy();
    expect(result.date.toISOString()).toBe('2023-09-26T15:01:26.553Z');
  });

  test('should parse arrays correctly', () => {
    const json = '{"list": [1, 2, "three"]}';
    expect(myJSONParse(json)).toEqual({ list: [1, 2, 'three'] });
  });

  test('should parse nested JSON correctly', () => {
    const json = '{"a": {"b": {"c": "d"}}}';
    expect(myJSONParse(json)).toEqual({ a: { b: { c: 'd' } } });
  });

  test('should parse booleans and null correctly', () => {
    const json = '{"yes": true, "no": false, "empty": null}';
    expect(myJSONParse(json)).toEqual({ yes: true, no: false, empty: null });
  });

  test('should parse numbers (integers and floats) correctly', () => {
    const json = '{"int": 123, "float": -456.78}';
    expect(myJSONParse(json)).toEqual({ int: 123, float: -456.78 });
  });

  test('should throw specific error message for invalid JSON', () => {
    const json = '{"key": "no closing brace"';
    expect(() => myJSONParse(json)).toThrow(
      'The syntax of the incoming JSON string is WRONG.'
    );
  });

  test('should throw error for invalid token', () => {
    const json = '{"key": $invalidToken}';
    expect(() => myJSONParse(json)).toThrow(
      'The syntax of the incoming JSON string is WRONG.'
    );
  });

  test('should return undefined for JSON "undefined" value', () => {
    const json = '{"key": undefined}';
    expect(myJSONParse(json)).toEqual({ key: undefined });
  });
});
