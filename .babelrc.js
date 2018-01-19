const config = {
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
        modules: false,
      },
    ],
    "@babel/preset-stage-2",
  ],
  plugins: [
    // Setting noInterop to true disables behavior where Babel creates synthetic
    // default exports. Setting this to match expected TypeScript behavior.
    ["@babel/plugin-transform-modules-commonjs", { noInterop: true }],
  ],
};

const env = process.env.BABEL_ENV || process.env.NODE_ENV;

// Transform async imports into something Jest environment understands.
if (env === "test") config.plugins.push("babel-plugin-dynamic-import-node");

module.exports = config;
