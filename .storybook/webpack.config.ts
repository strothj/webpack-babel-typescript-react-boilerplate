/* tslint:disable:strict-boolean-expressions */
import * as path from "path";
import * as webpack from "webpack";
import * as genDefaultConfig from "@storybook/react/dist/server/config/defaults/webpack.config";

export default (baseConfig: Configuration, env: any): Configuration => {
  const config: webpack.Configuration = genDefaultConfig(baseConfig, env);

  const { module } = baseConfig;
  if (!isNewModule(module)) throw shapeError;

  // Remove Babel 6 hard-coded config.
  const initialRulesCount = module.rules.length;
  module.rules = module.rules.filter(
    r => !(r.test !== undefined && r.test.toString() === /\.jsx?$/.toString()),
  );
  if (initialRulesCount === module.rules.length) throw shapeError;

  // Insert Babel 7 config with TypeScript support.
  module.rules.push(
    {
      test: /\.[jt]sx?/,
      exclude: [/node_modules/, /\.storybook*.webpack.config.ts/],
      loader: "babel-loader",
    },
    {
      test: /\.storybook*.webpack.config.ts/,
      loader: "ignore-loader",
    },
  );

  // Add ignore-loader to prevent re-transpile of Webpack config in .storybook.
  config.resolveLoader = config.resolveLoader || {};
  const { resolveLoader } = config;
  resolveLoader.modules = resolveLoader.modules || ["node_modules"];
  resolveLoader.modules.push(path.resolve(__dirname, "./shim"));

  config.resolve = config.resolve || {};
  config.resolve.extensions = config.resolve.extensions || [];
  config.resolve.extensions.push(".ts", ".tsx");

  // Quiet console output from Webpack Dev Middleware.
  const { entry } = config;
  if (!isStorybookEntry(entry)) throw shapeError;
  entry.preview.forEach((e, index) => {
    entry.preview[index] = e.replace("reload=true", "reload=true&noInfo=true");
  });

  return config;
};

type Configuration = webpack.Configuration;

const shapeError = new Error(
  ".storybook: webpack.config.ts: Unexpected Webpack config shape",
);

const isNewModule = (
  module: webpack.Module | undefined,
): module is webpack.NewModule => module !== undefined && "rules" in module;

const isStorybookEntry = (
  entry: webpack.Configuration["entry"],
): entry is { manager: string[]; preview: string[] } =>
  typeof entry === "object" &&
  !Array.isArray(entry) &&
  "manager" in entry &&
  "preview" in entry &&
  Array.isArray(entry.manager) &&
  Array.isArray(entry.preview);
