import * as path from "path";
import * as webpack from "webpack";
import { genDefaultConfig } from "storybook-babel-typescript-shim";
import { withStyledComponentsThemingAlias } from "../webpack.config";

type Configuration = webpack.Configuration;

const modifyConfig = (baseConfig: Configuration, env: any): Configuration => {
  const config = genDefaultConfig(baseConfig, env);

  // Replace Babel 6 hard coded config with local Babel 7 config.
  const module = config.module as webpack.NewModule;
  module.rules = module.rules
    .filter(
      r =>
        !(r.test !== undefined && r.test.toString() === /\.jsx?$/.toString()),
    )
    .concat({
      test: /\.[jt]sx?/,
      exclude: /node_modules/,
      use: "babel-loader",
    });

  // Add Styled Components theming alias.
  config.resolve = withStyledComponentsThemingAlias(config.resolve);

  config.resolve.extensions!.push(".ts", ".tsx");
  config.resolve.modules!.push(path.resolve(__dirname, "../src"));

  return config;
};

export default modifyConfig;
