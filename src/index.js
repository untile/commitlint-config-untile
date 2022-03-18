
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
    'body-full-stop': [2, 'always', '.'],
    'function-rules/type-enum': [2, 'always', parsed => {
      const regex = /^(Add|Bump|Fix|Improve|Release|Remove|Update) (\w+\s)*\w+$/;

      if (parsed.header.match(regex)) {
        return [true];
      }

      return [false, 'The commit must start with: (Add|Bump|Fix|Improve|Release|Remove|Update)'];
    }],
    'header-max-length': [2, 'always', 52],
    'scope-empty': [2, 'always'],
    'subject-empty': [0],
    'trailer-exists': [0],
    'type-case': [2, 'always', 'sentence-case'],
    'type-empty': [0],
    'type-enum': [0]
  }
};
