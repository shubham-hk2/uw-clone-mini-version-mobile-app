import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const RightTick = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={58} height={43} fill="none" {...props}>
    <Path
      d="M9 19.4l-7.7-7.7 1.4-1.4 6.3 6.3L21.3 3.6l1.4 1.4L9 19.4z"
      fill={color}
    />
  </Svg>
);
