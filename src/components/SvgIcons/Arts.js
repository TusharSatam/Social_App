import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const Arts = ({isSelected}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none">
    <G clipPath="url(#a)">
      <Path
        fill={isSelected ? 'white' : '#797979'}
        fillRule="evenodd"
        d="M6.525.865a10.5 10.5 0 0 1 14.071 6.128 3.784 3.784 0 0 1-.472 3.423A3.789 3.789 0 0 1 17.055 12H14.25a2.25 2.25 0 0 0-.682 4.396 2.217 2.217 0 0 1 1.457 1.93 2.145 2.145 0 0 1-1.514 2.285c-.917.26-1.865.392-2.817.389a10.5 10.5 0 0 1-5.454-1.532A10.583 10.583 0 0 1 .225 9.775a10.582 10.582 0 0 1 6.3-8.91ZM6.75 10.5a2.25 2.25 0 1 0 0-4.499 2.25 2.25 0 0 0 0 4.499Zm9-4.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-9 9.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={isSelected ? 'white' : '#797979'} d="M0 0h21v21H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Arts;
