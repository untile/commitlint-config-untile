
/**
 * Regexes.
 */

const regexes = {
  typeEnum: {
    atleastTwoWords: /(\w.+\s).+/,
    base: /^(Add|Bump|Fix|Improve|Release|Remove|Update) \S+(?: \S+)*$/,
    startWith: /^(Add|Bump|Fix|Improve|Release|Remove|Update) .+$/,
    whitespace: /^\S+(?: \S+)*$/
  }
};

/**
 * Export commitlint config.
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    message => message.includes('wip')
  ],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'body-case': [2, 'always', 'sentence-case'],
    'body-full-stop': [0],
    'function-rules/type-enum': [2, 'always', parsed => {
      if (!parsed.header.match(regexes.typeEnum.startWith)) {
        return [false, 'The commit must start with: Add|Bump|Fix|Improve|Release|Remove|Update'];
      }

      if (!parsed.header.match(regexes.typeEnum.atleastTwoWords)) {
        return [false, 'The commit must have at least two words'];
      }

      if (!parsed.header.match(regexes.typeEnum.whitespace)) {
        return [false, 'The commit must have a single whitespace between words'];
      }

      if (parsed.header.match(regexes.typeEnum.base)) {
        return [true];
      }

      return [false, `The commit not match: ${regexes.typeEnum.base}`];
    }],
    'header-full-stop': [2, 'never'],
    'header-max-length': [2, 'always', 52],
    'scope-empty': [0],
    'subject-empty': [0],
    'trailer-exists': [0],
    'type-case': [0],
    'type-empty': [0],
    'type-enum': [0]
  }
};
