import * as React from "react";
import { storiesOf } from "@storybook/react";
import BoilerplateTestComponent from "./BoilerplateTestComponent";

storiesOf("BoilerplateTestComponent", module).add("test render", () => (
  <BoilerplateTestComponent />
));
