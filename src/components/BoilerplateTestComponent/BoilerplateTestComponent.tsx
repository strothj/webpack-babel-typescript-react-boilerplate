import * as React from "react";
import styled, { withProps } from "styled";

import * as smallImage from "./assets/pexels-photo-270348.small.jpeg";
import * as largeImage from "./assets/pexels-photo-270348.jpeg";

// Making sure withProps is available (correct package aliasing).
export const SecondsCounterText = withProps<{ bold: boolean }>()(styled.span)`
  color: ${props => props.theme.boilerplateTestComponentColor};
  font-weight: ${props => (props.bold ? "600" : "400")};
`;

class BoilerplateTestComponent extends React.Component {
  state = { elapsed: 0, ComponentTitle: null as React.ComponentType | null };

  private interval: number;

  componentDidMount() {
    this.interval = window.setInterval(() => {
      // requestAnimationFrame - verify that it is supported in Jest environment
      requestAnimationFrame(() => {
        this.setState({ elapsed: this.state.elapsed + 1 });
        // console.log("tick");
      });
    }, 1000);

    // async import - verify async loaded component loads correctly
    import(/* webpackChunkName: "asyncLoadedComponentTitle" */ "./AsyncLoadedComponentTitle").then(
      mod => {
        // console.log("### mod ###", mod);
        this.setState({ ComponentTitle: mod.default });
      },
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    /* tslint:disable:strict-boolean-expressions */
    return (
      <>
        {this.state.ComponentTitle && (
          <>
            <this.state.ComponentTitle />
            <br />
          </>
        )}
        <SecondsCounterText bold>
          Seconds: {this.state.elapsed}
        </SecondsCounterText>
        <br />
        <img src={smallImage} style={{ width: 100 }} />
        <br />
        <img src={largeImage} style={{ width: 100 }} />
        <br />
        <p>NODE_ENV: {process.env.NODE_ENV}</p>
      </>
    );
    /* tslint:enable:strict-boolean-expressions */
  }
}

export default BoilerplateTestComponent;
