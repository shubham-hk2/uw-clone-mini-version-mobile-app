import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

interface IconProps extends SvgProps {
  focused: boolean;
}

export const BadgesIcon = ({ focused, ...props }: IconProps) => (
  <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
    <Path
      d="M8.5 13.4722V21L12.5 19L16.5 21V13.4722M18.5 9C18.5 12.3137 15.8137 15 12.5 15C9.18629 15 6.5 12.3137 6.5 9C6.5 5.68629 9.18629 3 12.5 3C15.8137 3 18.5 5.68629 18.5 9Z"
      stroke={props.color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill={focused ? props.color : 'none'}
    />
  </Svg>
);
