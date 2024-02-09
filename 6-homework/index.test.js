const { localize, highlightKeywords, multiline, curry } = require('./index.js');

describe('localize function', () => {
  const translationsObj = {
    en: {
      greet: 'Hello',
      intro: 'Welcome to our website'
    },
    fr: {
      greet: 'Bonjour',
      intro: 'Bienvenue sur notre site web'
    }
  };

  it('should return the localized greeting in French', () => {
    const localizedGreeting = localize`${'greet'}`('fr', translationsObj);
    expect(localizedGreeting).toBe('Bonjour');
  });

  it('should return the localized greeting in French', () => {
    const localizedGreeting = localize`Hi! ${'greet'} asd`('fr', translationsObj);
    expect(localizedGreeting).toBe('Hi! Bonjour asd');
  });

  it('should return the localized introduction in French', () => {
    const localizedIntroduction = localize`${'intro'}`('fr', translationsObj);
    expect(localizedIntroduction).toBe('Bienvenue sur notre site web');
  });

  it('should throw an error for an unsupported language', () => {
    expect(() => localize`${'greet'}`('es', translationsObj)).toThrowError(
      'Language es not supported.'
    );
  });

  it('should throw an error for an unsupported expression', () => {
    expect(() =>
      localize`${'unsupported'}`('fr', translationsObj)
    ).toThrowError('"unsupported" not supported in translation.');
  });
});

describe('highlightKeywords function', () => {
  it('should throw an error if template is not a string or has less than 4 characters', () => {
    expect(() => highlightKeywords(123, [])).toThrowError(
      'Template 123 is incorrect.'
    );
    expect(() => highlightKeywords('abc', [])).toThrowError(
      'Template abc is incorrect.'
    );
  });

  it('should throw an error if keywords is not an array', () => {
    expect(() => highlightKeywords('template', 'keyword')).toThrowError(
      'Keyword keyword is incorrect.'
    );
  });

  it('should throw an error if keywords length does not match occurences length', () => {
    const keywords = ['JavaScript', 'template'];
    const template =
      'Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.';
    expect(() => highlightKeywords(template, keywords)).toThrowError(
      'keywords not match with occurences'
    );
  });

  it('should return the highlighted template with placeholders replaced by keywords', () => {
    const keywords = ['JavaScript', 'template', 'tagged'];
    const template =
      'Learn ${1} tagged templates to create custom ${0} literals for ${2} manipulation.';
    const expected =
      "Learn <span class='highlight'>template</span> tagged templates to create custom <span class='highlight'>JavaScript</span> literals for <span class='highlight'>tagged</span> manipulation.";
    expect(highlightKeywords(template, keywords)).toBe(expected);
  });
});

describe('multiline function', () => {
  it('should add line numbers to each line', () => {
    expect([
      multiline`
    function add(a, b) {
    return a + b;
    }
    `
    ]).toEqual(['1 function add(a, b) {\n2 return a + b;\n3 }']);
  });

  it('should handle a single-line input', () => {

    expect(multiline`const x = 5;`).toEqual(`1 const x = 5;`);
  });

  it('should trim leading and trailing whitespace', () => {
    expect([
      multiline`
    
    function add(a, b) {
      return a + b;
    }

  
  `
    ]).toEqual(['1 function add(a, b) {\n2 return a + b;\n3 }']);
  });

  it('should handle a multiline input with trailing newline', () => {
    expect([
      multiline`
    function add(a, b) {
      return a + b;
    }\n`
    ]).toEqual(['1 function add(a, b) {\n2 return a + b;\n3 }']);
  });
});

describe('curry function', () => {
  it('should return a curried function', () => {
    const add = curry((a, b) => a + b);
    expect(add(1)(2)).toBe(3);
  });
  it('should handle multiple arguments', () => {
    const add = curry((a, b, c) => a + b + c);
    expect(add(1)(2)(3)).toBe(6);
  });
  it('should handle zero arguments', () => {
    const add = curry(() => 0);
    expect(add()).toBe(0);
  });
  it('should handle multiple curried functions', () => {
    const add = curry((a, b) => a + b);
    const multiply = curry((a, b) => a * b);
    expect(multiply(add(1)(2), 3)).toBe(9);
  });
  it('dynamic parameters', () => {
    const add = curry((a, b, c) => a + b + c);
    expect(add(1, 2)(3)).toBe(6);
  });
});
