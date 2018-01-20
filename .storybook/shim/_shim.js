const path = require("path");

require("@babel/register")({
  extensions: [".ts", ".tsx"],
  only: [/\.storybook[\\\/].+\.tsx?/, /webpack\.config\.ts/],
});

module.exports = req => {
  switch (req) {
    case "config":
      return require("../config").default;
    case "webpack":
      return require("../webpack.config").default;
    default:
      throw new Error("Unexpected resource request in _shim: " + req);
  }
};
