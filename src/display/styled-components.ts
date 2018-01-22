// This module is imported using the import:
// import styled from "styled";
// Reference webpack.config.ts / jest.config.js / tsconfig.json

// https://www.styled-components.com/docs/api#typescript
// tslint:disable no-duplicate-imports
import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";
import { Theme } from "./theme";
import { ThemeMediaQueries } from "./themeMediaQueries";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<
  Theme & { media: ThemeMediaQueries }
>;

// https://github.com/styled-components/styled-components/issues/630
type ThemedStyledFunction<T> = styledComponents.ThemedStyledFunction<
  T,
  Theme & { media: ThemeMediaQueries }
>;

const withProps = <U>() => <P>(fn: ThemedStyledFunction<P>) =>
  fn as ThemedStyledFunction<P & U>;

export { css, injectGlobal, keyframes, withProps, ThemeProvider };
export default styled;
