import * as path from "path";
import * as webpack from "webpack";
import * as HtmlPlugin from "html-webpack-plugin";
import * as WatchMissingNodeModulesPlugin from "react-dev-utils/WatchMissingNodeModulesPlugin";
import * as CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import * as ManifestPlugin from "webpack-manifest-plugin";
import * as CopyPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const defaultEnvironment = {
  production: false,
  watch: false,
  analyze: false,
};
type Env = typeof defaultEnvironment;

const momentJsBundleSizeReductionPlugins: webpack.Plugin[] = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // new webpack.NormalModuleReplacementPlugin(
  //   /data\/packed\/latest\.json/,
  //   require.resolve("./src/timezone-definitions.json"),
  // ),
];

const createConfig = (env = defaultEnvironment): webpack.Configuration => ({
  context: __dirname,

  entry: () =>
    [
      "./src/polyfills.ts",
      "webpack-dev-server/client?http://localhost:3000",
      "webpack/hot/dev-server",
      "./src/index.ts",
    ].filter(e => (env.watch ? true : !e.includes("webpack"))),

  output: env.watch
    ? {
        pathinfo: true,
        publicPath: "/",
        filename: "assets/js/bundle.js",
        chunkFilename: "assets/js/[name].chunk.js",
        path: path.resolve(__dirname, "dist/app"),
        devtoolModuleFilenameTemplate: info =>
          path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
      }
    : {
        publicPath: getPublicPath(env.production),
        filename: "assets/js/[name].[hash:8].js",
        chunkFilename: "assets/js/[name].[hash:8].js",
        path: path.resolve(__dirname, "dist/app"),
        sourceMapFilename: "[file].map",
      },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "assets/media/[name].[hash:8].[ext]",
            },
          },
          {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: "babel-loader",
          },
          {
            // Fall through loader, catches any not caught by the above.
            test: /.*/,
            loader: "file-loader",
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: "assets/media/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },

  resolve: withStyledComponentsThemingAlias({
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
  }),

  plugins: concatPlugins(env, {
    common: [
      new HtmlPlugin({
        filename: path.resolve(__dirname, "dist/app/index.html"),
        template: path.resolve(__dirname, "public/index.app.html"),
        inject: true,
        ...getHtmlMinificationConfig(env.production),
      }),
      // prettier-ignore
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.production ? "production" : "development"),
        "process.env.PUBLIC_PATH": JSON.stringify(getPublicPath(env.production)),
        "process.env.ASSET_PATH": JSON.stringify(getPublicPath(env.production) + "/assets"),
      }),
      new ManifestPlugin({ fileName: "asset-manifest.json" }),
      new CopyPlugin([
        {
          from: "public",
          to: path.resolve(__dirname, "dist"),
          ignore: ["index.*.html"],
        },
      ]),
    ],
    production: [new webpack.optimize.UglifyJsPlugin(uglifyJsConfig)],
    notProduction: [
      new webpack.NamedModulesPlugin(),
      new HtmlPlugin({
        filename: path.resolve(__dirname, "dist/index.html"),
        template: path.resolve(__dirname, "public/index.demo.html"),
        inject: false,
      }),
    ],
    watch: [
      new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      new WatchMissingNodeModulesPlugin(path.resolve("node_modules")),
    ],
    analyze: [new BundleAnalyzerPlugin()],
  }).concat(...momentJsBundleSizeReductionPlugins),

  devServer: env.watch
    ? {
        publicPath: "/",
        contentBase: path.resolve(__dirname, "public"),
        port: 3000,
        hot: true,
        open: true,
        compress: true,
        clientLogLevel: "none",
      }
    : {},

  devtool: env.production ? "source-map" : "cheap-module-source-map",

  performance: env.watch ? { hints: false } : undefined,
});

/**
 * Generate public path based on package.json homepage field.
 * ```
 * production = false -> /app
 * production = true && package.json->.homepage = "https://www.example.com/path" -> /path
 * production = true && package.json->.homepage = undefined -> /
 * ```
 */
const getPublicPath = (production: boolean): string => {
  if (!production) return "/app/";
  const homepage = require("./package.json").homepage;
  const publicPath = homepage ? require("url").parse(homepage).pathname : "/";
  return publicPath.endsWith("/") ? publicPath : publicPath + "/";
};

type ConcatPluginKey =
  | "common"
  | "production"
  | "notProduction"
  | "development"
  | "notDevelopment"
  | "watch"
  | "notWatch"
  | "analyze"
  | "notAnalyze";
type PTable = Partial<Record<ConcatPluginKey, webpack.Plugin[]>>;

const concatPlugins = (env: Env, pluginsTable: PTable): webpack.Plugin[] => {
  const plugins: webpack.Plugin[] = [];

  Object.entries(pluginsTable).forEach(([k, v]) => {
    if (!Array.isArray(v)) throw new Error("Expected plugin array");
    const envKey = k.replace(/^not/, "").toLowerCase() as keyof Env;
    const shouldInclude = !k.includes("not");
    const has = Boolean(env[envKey]);

    if (k === "common" || has === shouldInclude) plugins.push(...v);
  });

  return plugins;
};

// Exported for use with Storybook config.
// prettier-ignore
/* tslint:disable:strict-boolean-expressions */
export const withStyledComponentsThemingAlias = (
  resolve: webpack.Resolve | undefined,
): webpack.Resolve => {
  const resolveSC: webpack.Resolve = resolve || {};
  resolveSC.alias = resolveSC.alias || {};
  resolveSC.alias["styled$"] = path.resolve(__dirname, "src/display/styled-components");
  return resolveSC;
};
/* tslint:enable:strict-boolean-expressions */

const getHtmlMinificationConfig = (production: boolean) =>
  production
    ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }
    : {};

const uglifyJsConfig = {
  compress: {
    warnings: false,
    comparisons: false,
  },
  mangle: {
    safari10: true,
  },
  output: {
    comments: false,
    ascii_only: true,
  } as any,
  sourceMap: true,
};

export default createConfig;
