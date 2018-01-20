import * as React from "react";
import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider } from "display";

addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

const req = require.context("../src/components", true, /\.stories\.tsx?$/);
const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);

export default "";
