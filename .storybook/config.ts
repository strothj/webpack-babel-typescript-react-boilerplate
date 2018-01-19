import { configure } from "@storybook/react";

const req = require.context("../src/components", true, /\.stories\.tsx?$/);
const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);

export default "";
