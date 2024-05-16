import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Business = ({isSelected}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={21} height={19} fill="none">
    <Path
      fill={isSelected ? 'white' : '#797979'}
      d="M8.5 13.5v-1H1.51l-.01 4c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4Zm10-9h-4.01v-2l-2-2h-4l-2 2v2H2.5c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2Zm-6 0h-4v-2h4v2Z"
    />
  </Svg>
);
export default Business;
