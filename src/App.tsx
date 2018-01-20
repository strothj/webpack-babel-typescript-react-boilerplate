import * as React from "react";
import { ThemeProvider } from "display";
import BoilerplateTestComponent from "components/BoilerplateTestComponent";

const App = () => (
  <ThemeProvider>
    <BoilerplateTestComponent />
  </ThemeProvider>
);

export default App;
