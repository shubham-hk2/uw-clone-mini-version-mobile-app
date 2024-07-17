import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

interface IconProps extends SvgProps {
  focused: boolean;
}

export const ProfileIcon = ({ focused, ...props }: IconProps) => (
  <Svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill={focused ? props.color : 'none'}
    {...props}
  >
    <Path
      d="M17.5 20C18.6046 20 19.5454 19.0899 19.2951 18.0141C18.6723 15.338 16.5897 14 12.5 14C8.41032 14 6.3277 15.338 5.70492 18.0141C5.45455 19.0899 6.39543 20 7.5 20H17.5Z"
      stroke={props.color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.5 11C14.5 11 15.5 10 15.5 7.5C15.5 5 14.5 4 12.5 4C10.5 4 9.5 5 9.5 7.5C9.5 10 10.5 11 12.5 11Z"
      stroke={props.color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
