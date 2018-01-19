declare module "react-dev-utils/WatchMissingNodeModulesPlugin" {
  import { Plugin } from "webpack";

  namespace WatchMissingNodeModulesPlugin {

  }

  class WatchMissingNodeModulesPlugin extends Plugin {
    constructor(path: string);
  }

  export = WatchMissingNodeModulesPlugin;
}
