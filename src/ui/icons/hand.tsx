import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Hand = ({ color = '#000', ...props }: SvgProps) => (
  <Svg
    strokeWidth={3.4}
    width={40}
    height={58}
    viewBox="0 0 40 58"
    fill="none"
    {...props}
  >
    <Path
      d="M34.4 25.3996C32.4116 25.3996 30.8 27.0112 30.8 28.9996V8.59961C30.8 6.61121 29.1884 4.99961 27.2 4.99961C25.2116 4.99961 23.6 6.61121 23.6 8.59961V26.5996V6.19961C23.6 4.21121 21.9884 2.59961 20 2.59961C18.0116 2.59961 16.4 4.21121 16.4 6.19961V7.39961V25.3996V8.59961C16.4 6.61121 14.7884 4.99961 12.8 4.99961C10.8116 4.99961 9.2 6.61121 9.2 8.59961V36.1996V27.7996C9.2 25.3996 7.5884 24.1996 5.6 24.1996C3.6116 24.1996 2 25.8112 2 27.7996V37.3996C2 47.3404 10.0592 55.3996 20 55.3996C29.9408 55.3996 38 47.3404 38 37.3996V28.9996C38 27.0112 36.3884 25.3996 34.4 25.3996Z"
      stroke="#273B4A"
      stroke-width="3.84615"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
