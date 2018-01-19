import * as React from "react";

import * as smallImage from "./assets/pexels-photo-270348.small.jpeg";
import * as largeImage from "./assets/pexels-photo-270348.jpeg";

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
        Seconds: {this.state.elapsed}
        <br />
        <img src={smallImage} style={{ width: 100 }} />
        <br />
        <img src={largeImage} style={{ width: 100 }} />
      </>
    );
    /* tslint:enable:strict-boolean-expressions */
  }
}

export default BoilerplateTestComponent;
