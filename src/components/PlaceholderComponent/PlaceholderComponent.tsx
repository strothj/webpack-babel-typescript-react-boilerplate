/* tslint:disable:strict-boolean-expressions */
import * as React from "react";

import * as smallImage from "./pexels-photo-270348.small.jpeg";
import * as largeImage from "./pexels-photo-270348.jpeg";

class PlaceholderComponent extends React.Component {
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
    import(/* webpackChunkName: "componentTitle" */ "./ComponentTitle").then(
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
    return (
      <>
        {this.state.ComponentTitle && (
          <>
            <this.state.ComponentTitle />
            <br />
          </>
        )}
        Seconds: {this.state.elapsed}
        <br />
        <img src={smallImage} style={{ width: 100 }} />
        <br />
        <img src={largeImage} style={{ width: 100 }} />
      </>
    );
  }
}

export default PlaceholderComponent;
