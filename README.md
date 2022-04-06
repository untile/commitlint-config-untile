# commitlint-config-untile

Untile-flavored commitlint config.

## Installation

```sh
$ yarn add @commitlint/cli @untile/commitlint-config-untile --dev
```

## Usage

Create an `.commitlintrc.js` file with the following:

```js
module.exports = {
  extends: ['@untile/commitlint-config-untile']
};
```

## Rules

- Commit header should start to: **Add|Bump|Fix|Improve|Release|Remove|Update**.
- Commit header must not be longer than **52** characters.
- Commit header must have **more than 1 word**.
- Commit body should be in sentence-case.
- Commit body should have a full stop.

**NOTE**
Follow the [commitlint.js.org](https://commitlint.js.org/#/guides-local-setup?id=install-husky) guide
to see how to finish the configuration, using for example husky.

## Releases

Be sure to have configured `NPM_TOKEN` in your globals.

```bash
npm version [<new version> | major | minor | patch] -m "Release %s"
git push origin master && git push --tags
```
