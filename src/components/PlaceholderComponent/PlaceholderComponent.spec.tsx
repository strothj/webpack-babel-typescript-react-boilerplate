import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceholderComponent from "./PlaceholderComponent";

it("renders", done => {
  const component = renderer.create(<PlaceholderComponent />);
  setTimeout(() => {
    expect(component.toJSON()).toMatchSnapshot();
  }, 1);
  setTimeout(() => {
    expect(component.toJSON()).toMatchSnapshot();
    done();
  }, 1200);
});
