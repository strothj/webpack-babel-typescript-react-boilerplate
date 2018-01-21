# [webpack-babel-typescript-react-boilerplate]

Boilerplate project for bootstrapping a React project using the Typescript transform with Babel 7.

## Support

This is a personal project for my use in bootstrapping projects. If you find it useful, feel free to submit pull requests.

## Libraries

* React
* TypeScript
* Babel 7
* Storybook
* Jest
* Styled Components

## Issues

* `tslint-config-airbnb` - Waiting on [issue #26] to be resolved to avoid having a warning show up about a deprecated rule. Using a fork for now with a pull request merged in that resolves the issue.
* `storybook` - Using a shim in the `.storybook/shim` directory to bridge the ES6/Babel config loading with TypeScript. Ideally, the project would use the [interpret package] like Webpack does.
* `jest` - Currently relying on [`"babel-core": "^7.0.0-bridge.0"`][babel-core-bridge] to make compatible with [Jest][jest-babel].

[webpack-babel-typescript-react-boilerplate]: https://github.com/strothj/webpack-babel-typescript-react-boilerplate
[issue #26]: https://github.com/progre/tslint-config-airbnb/issues/26
[interpret package]: https://github.com/js-cli/js-interpret
[babel-core-bridge]: https://babeljs.io/blog/2017/09/12/planning-for-7.0
[jest-babel]: https://facebook.github.io/jest/docs/en/getting-started.html
