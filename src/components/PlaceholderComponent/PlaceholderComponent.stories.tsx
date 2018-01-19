import * as React from "react";
import { storiesOf } from "@storybook/react";
import PlaceholderComponent from "./PlaceholderComponent";

storiesOf("PlaceholderComponent", module).add("test render", () => (
  <PlaceholderComponent />
));
