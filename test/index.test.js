
/**
 * Module dependencies.
 */

const commitlint = require('@commitlint/lint');
const config = require('../src');
const load = require('@commitlint/load');

/**
 * Lint.
 */

const lint = async message => {
  const preparedConfig = await load.default(config);

  return commitlint.default(message, preparedConfig.rules, {
    parserOpts: preparedConfig.parserPreset.parserOpts,
    ...preparedConfig
  });
};

/**
  * `commitlint-config-untile` tests.
  */

describe('commitlint-config-untile', () => {
  describe('correct', () => {
    it('should return true if the commit complies with the rules', () => {
      return lint('Add foobar').then(result => {
        expect(result.valid).toBe(true);
      });
    });

    it('should return true if the commit starts with `wip`', () => {
      return lint('wip').then(result => {
        expect(result.valid).toBe(true);
      });
    });
  });

  describe('incorrect', () => {
    it('should return an error if the commit not start with (Add|Bump|Fix|Improve|Release|Remove|Update)', () => {
      return lint('Foo bar').then(result => {
        expect(result.valid).toBe(false);
        expect(result.errors[0].name).toEqual('function-rules/type-enum');
      });
    });

    it('should return an error if the commit exceed the 52 chars limit', () => {
      return lint('Add lorem ipsum is simply dummy text of the printing a').then(result => {
        expect(result.valid).toBe(false);
        expect(result.errors[0].name).toEqual('header-max-length');
      });
    });

    it('should return an error if the commit has only one word', () => {
      return lint('Add').then(result => {
        expect(result.valid).toBe(false);
        expect(result.errors[0].name).toEqual('function-rules/type-enum');
      });
    });

    it('should return an error if the commit has an whitespace in the end', () => {
      return lint('Add foo ').then(result => {
        expect(result.valid).toBe(false);
        expect(result.errors[0].name).toEqual('function-rules/type-enum');
      });
    });

    it('should return an error if the commit has more than one whitespace between words', () => {
      return lint('Add  foo').then(result => {
        expect(result.valid).toBe(false);
        expect(result.errors[0].name).toEqual('function-rules/type-enum');
      });
    });

    it('should return an error if the commit ends with full stop', () => {
      return lint('Add foo.').then(result => {
        expect(result.valid).toBe(false);
        expect(result.errors[0].name).toEqual('header-full-stop');
      });
    });
  });
});
