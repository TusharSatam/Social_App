import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Animal = ({isSelected}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none">
    <Path
      fill={isSelected ? 'white' : '#797979'}
      d="M22.5 10.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Zm-15.75 0a2.625 2.625 0 1 0-5.25 0 2.625 2.625 0 0 0 5.25 0ZM8.625 8.75a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25Zm6.75 0a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25Zm2.168 5.706a3.309 3.309 0 0 1-1.582-1.982 4.125 4.125 0 0 0-7.922 0 3.305 3.305 0 0 1-1.57 1.978 3.75 3.75 0 0 0 3.236 6.755 6.01 6.01 0 0 1 4.582 0 3.75 3.75 0 0 0 3.255-6.75v-.001Z"
    />
  </Svg>
);
export default Animal;
