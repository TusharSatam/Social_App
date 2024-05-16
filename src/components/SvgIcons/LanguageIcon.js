import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const LanguageIcon = ({isSelected}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none">
    <Path
      fill={isSelected ? 'white' : '#797979'}
      d="M11.5 1.5h-8c-1.1 0-2 .9-2 2v12l3-3h5v-1c0-2.2 1.79-4 4-4v-4c0-1.1-.9-2-2-2Zm0 3H10c-.34 1.19-.96 2.3-1.82 3.26l-.02.02 1.26 1.25-.37 1.01L7.5 8.5 5 11l-.69-.73 2.53-2.49A8.6 8.6 0 0 1 5.36 5.5h.99c.31.6.69 1.17 1.15 1.68A7.7 7.7 0 0 0 9.07 4.5H3.5v-1H7v-1h1v1h3.5v1Zm10 5h-8c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h7l3 3v-12c0-1.1-.9-2-2-2Zm-1.37 10-.85-2.25h-3.56l-.84 2.25h-1.5l3.37-9h1.5l3.38 9h-1.5Zm-2.63-7 1.22 3.25h-2.43l1.21-3.25Z"
    />
  </Svg>
);
export default LanguageIcon;
