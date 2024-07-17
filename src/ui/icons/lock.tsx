import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path, Rect } from 'react-native-svg';

export const Lock = ({ color = '#CCC', style, ...props }: SvgProps) => (
  <Svg width="54" height="54" viewBox="0 0 54 54" fill="none">
    <Rect x="13.5" y="22.5" width="27" height="22.5" fill="white" />
    <Path
      d="M27 31.5V36M18 20.25V13.5C18 8.52944 22.0294 4.5 27 4.5C31.9706 4.5 36 8.52944 36 13.5V20.25M27 20.25H15.75C13.2647 20.25 11.25 22.2647 11.25 24.75V42.75C11.25 45.2353 13.2647 47.25 15.75 47.25H38.25C40.7353 47.25 42.75 45.2353 42.75 42.75V24.75C42.75 22.2647 40.7353 20.25 38.25 20.25H27Z"
      stroke="white"
      stroke-width="4.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M27 31.5V36"
      stroke="#C4C4C4"
      stroke-opacity="0.85"
      stroke-width="4.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
