import * as React from "react";
import {
  injectGlobal,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled";
import theme from "./theme";

const ThemeProvider: React.SFC<{}> = props => (
  <StyledComponentsThemeProvider theme={theme}>
    <>
      {/* react-helmet, ... */}
      {props.children}
    </>
  </StyledComponentsThemeProvider>
);

/* tslint:disable-next-line:no-unused-expression */
injectGlobal`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

export default ThemeProvider;
