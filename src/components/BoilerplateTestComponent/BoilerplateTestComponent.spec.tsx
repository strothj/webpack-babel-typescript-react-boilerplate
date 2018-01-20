import * as React from "react";
import * as renderer from "react-test-renderer";
import { ThemeProvider } from "display";
import BoilerplateTestComponent from "./BoilerplateTestComponent";

const createRenderer = () =>
  renderer.create(
    <ThemeProvider>
      <BoilerplateTestComponent />
    </ThemeProvider>,
  );

it("renders loads subcomponent asynchronously", done => {
  const component = createRenderer();

  // Renders component without subcomponent <AsyncLoadedComponentTitle />
  expect(component.toJSON()).toMatchSnapshot();

  setTimeout(() => {
    // Renders asynchronously loaded subcomponent
    expect(component.toJSON()).toMatchSnapshot();

    setTimeout(() => {
      // Increments timer count
      expect(component.toJSON()).toMatchSnapshot();
      done();
    }, 1000);
  }, 100);
});
