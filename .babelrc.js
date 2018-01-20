const env = process.env.BABEL_ENV || process.env.NODE_ENV;

module.exports = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions", "safari >= 7"],
        },
        useBuiltIns: "usage",
        shippedProposals: true,
        modules: false,
      },
    ],
    "@babel/preset-stage-2",
  ],
  plugins: [
    // Setting noInterop to true disables behavior where Babel creates synthetic
    // default exports. Setting this to match expected TypeScript behavior.
    ["@babel/plugin-transform-modules-commonjs", { noInterop: true }],

    // https://www.styled-components.com/docs/tooling#better-debugging
    "babel-plugin-styled-components",

    // Transform async imports into something Jest environment understands.
    ...(env === "test" ? ["babel-plugin-dynamic-import-node"] : []),
  ],
};
