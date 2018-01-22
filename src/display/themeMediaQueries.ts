/**
 * Creates an object with the keys "min" and "max" which each have keys for the
 * devices (viewport sizes) listed by the "sizes" object. Each viewport function
 * is a template string function which creates a media query.
 *
 * @see https://www.styled-components.com/docs/advanced#media-templates
 * @example
 * ```
 *  const Content = styled.div`
 *    height: 3em;
 *
 *    ${props => props.theme.media.min.tablet`
 *      background: dodgerblue;
 *    `}
 *  `;
 * ```
 */
import {
  Interpolation,
  ThemedStyledProps,
  FlattenInterpolation,
} from "styled-components";
import { css } from "styled";
import { Theme } from "./theme";

// Add additional media queries here.
const sizes: Record<DeviceType, number> = {
  tablet: 768,
};

const themeMediaQueries = { min: {}, max: {} } as ThemeMediaQueries;

Object.keys(sizes).reduce((acc, label) => {
  const device = label as DeviceType;

  (["min", "max"] as Range[]).forEach(range => {
    const mediaTemplate: ThemedCssFunction = (
      strings,
      ...interpolations
    ) => css`
      @media (${range}-width: ${sizes[device]}px) {
        ${css(strings, ...interpolations)};
      }
    `;

    acc[range][device] = mediaTemplate;
  });

  return acc;
}, themeMediaQueries);

export default themeMediaQueries;

export type ThemeMediaQueries = Record<
  Range,
  Record<DeviceType, ThemedCssFunction>
>;

// Pulled from styled-components type definitions.
type ThemedCssFunction = (
  strings: TemplateStringsArray,
  ...interpolations: Interpolation<
    ThemedStyledProps<{}, Theme & { media: ThemeMediaQueries }>
  >[]
) => FlattenInterpolation<
  ThemedStyledProps<{}, Theme & { media: ThemeMediaQueries }>
>[];

type Range = "min" | "max";
type DeviceType = "tablet";
