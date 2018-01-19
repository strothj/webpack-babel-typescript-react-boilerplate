import * as React from "react";
import * as renderer from "react-test-renderer";
import BoilerplateTestComponent from "./BoilerplateTestComponent";

it("renders", done => {
  const component = renderer.create(<BoilerplateTestComponent />);
  setTimeout(() => {
    expect(component.toJSON()).toMatchSnapshot();
  }, 1);
  setTimeout(() => {
    expect(component.toJSON()).toMatchSnapshot();
    done();
  }, 1200);
});
