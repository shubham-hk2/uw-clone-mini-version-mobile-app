import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

interface HomeIconProps extends SvgProps {
  focused: boolean;
}

export const HomeIcon = ({ focused, ...props }: HomeIconProps) => (
  <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
    <Path
      d="M19.5167 7.14177C20.1261 7.50149 20.5 8.15646 20.5 8.8641V18C20.5 19.1046 19.6046 20 18.5 20H16.5C15.3954 20 14.5 19.1046 14.5 18V13.9999C14.5 12.8954 13.6046 11.9999 12.5 11.9999V11.9999C11.3954 11.9999 10.5 12.8954 10.5 13.9999V18C10.5 19.1046 9.60457 20 8.5 20H6.5C5.39543 20 4.5 19.1046 4.5 18V8.8641C4.5 8.15646 4.87395 7.50149 5.48335 7.14177L11.4833 3.60011C12.1106 3.22988 12.8894 3.22988 13.5167 3.60011L19.5167 7.14177Z"
      stroke={props.color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill={focused ? props.color : 'none'}
    />
  </Svg>
);
