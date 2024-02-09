interface Itranslations {
  [property: string]: {
    greet: string;
    intro: string;
  };
}
//Task 1: Quasi-Tagged Templates
export function localize(
  stringsArr: TemplateStringsArray,
  ...expressions: any[]
) {
  return function LanguageTemplate(
    language: keyof typeof translations,
    translations: Itranslations
  ) {
    if (!(language in translations)) {
      throw Error(`Language ${language} not supported.`);
    }
    const translation = translations[language];

    return expressions.reduce((acc, exp, id) => {
      if (typeof exp === 'string' && exp in translation) {
        return (
          acc +
          translation[exp as keyof typeof translation] +
          stringsArr[id + 1]
        );
      } else {
        throw new Error(`${JSON.stringify(exp)} not supported in translation.`);
      }
    }, stringsArr[0]);
  };
}

//Task 2: Advanced Tagged Template
export function highlightKeywords(template: string, keywords: string[]) {
  if (typeof template !== 'string' || template.length < 4) {
    throw new Error(`Template ${template} is incorrect.`);
  }
  if (!Array.isArray(keywords)) {
    throw new Error(`Keyword ${keywords} is incorrect.`);
  }
  let templateArr = template.split(/\$\{\d*\}/g);
  let occurences = (template.match(/\$\{\d*\}/g) || []).map(occ =>
    parseInt(occ.replace(/\$|\{|\}/g, ''))
  );
  if (occurences.length !== keywords.length) {
    throw new Error('keywords not match with occurences');
  }
  let arr = occurences.reduce(
    (acc, occ, i) =>
      acc +
      "<span class='highlight'>" +
      keywords[occ] +
      '</span>' +
      templateArr[i + 1],
    templateArr[0]
  );

  return arr;
}

//Task 5: Implementing Throttle Function
export function multiline(strings: TemplateStringsArray) {
  // Split the template strings into lines
  let linesStr = strings[0].trim();
  let lines = linesStr.split('\n');

  // Map over the lines and add line numbers
  const numberedLines = lines.map(
    (line, index) => `${index + 1} ${line.trim()}`
  );

  // Join the lines back together with newline characters
  return numberedLines.join('\n');
}

// Task 6: Currying Function Implementation
export const curry = (fn: Function) => {
  const curried = (...args: any[]): Function => {
    if (fn.length !== args.length) {
      return curried.bind(null, ...args);
    }
    return fn(...args);
  };
  return curried;
};
