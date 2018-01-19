declare module "@storybook/react/dist/server/config/defaults/webpack.config" {
  import { Configuration } from "webpack";

  namespace genDefaultConfig {

  }

  const genDefaultConfig: (
    baseConfig: Configuration,
    env: any,
  ) => Configuration;

  export = genDefaultConfig;
}
