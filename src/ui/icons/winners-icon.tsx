import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const WinnersIcon = ({ ...props }: SvgProps) => (
  <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
    <Path
      d="M12.5 15V15C14.7091 15 16.5 13.2091 16.5 11V11M12.5 15V15C10.2909 15 8.5 13.2091 8.5 11V11M12.5 15V20M12.5 20H16.5M12.5 20H8.5M8.5 6V4H16.5V6M8.5 6H6.5C5.39543 6 4.5 6.89543 4.5 8V8.43845C4.5 9.35618 5.12459 10.1561 6.01493 10.3787L8.5 11M8.5 6V11M16.5 11L18.9851 10.3787C19.8754 10.1561 20.5 9.35618 20.5 8.43845V8C20.5 6.89543 19.6046 6 18.5 6H16.5M16.5 11V6"
      stroke={props.color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
