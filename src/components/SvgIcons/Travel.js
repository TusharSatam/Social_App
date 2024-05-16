import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Travel = ({isSelected}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none">
    <Path
      fill={isSelected ? 'white' : '#797979'}
      d="M3.914 14.278 2.5 15.692l4.949 2.121 2.122 4.95 1.414-1.414-.707-3.536 3.313-3.313 3.61 7.704 1.339-1.339-1.19-10.123 2.828-2.829a2 2 0 1 0-2.828-2.828l-2.903 2.903-10.123-1.19-1.265 1.265 7.644 3.67-3.253 3.253-3.536-.708Z"
    />
  </Svg>
);
export default Travel;
