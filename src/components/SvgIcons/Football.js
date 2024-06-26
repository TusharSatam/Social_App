import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const Football = ({isSelected}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none">
    <G clipPath="url(#a)">
      <Path
        fill={isSelected ? 'white' : '#797979'}
        d="M12 2.5c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10Zm3.408 2.76-2.82 2.049a1 1 0 0 1-1.067.069l-.109-.069-2.82-2.049c-.81.382-1.55.898-2.19 1.525l-.234.239 1.077 3.313a1 1 0 0 1-.264 1.036l-.1.082-2.819 2.048c.114.91.38 1.771.773 2.559l.153.292h3.485a1 1 0 0 1 .909.582l.042.109 1.078 3.315a8.042 8.042 0 0 0 2.63.06l.367-.06 1.077-3.315a1 1 0 0 1 .834-.684l.117-.007h3.485a7.93 7.93 0 0 0 .876-2.512l.05-.339-2.82-2.048a1 1 0 0 1-.395-.994l.032-.124 1.077-3.313A8.029 8.029 0 0 0 15.71 5.41l-.302-.15Zm-3.996 3.431a1 1 0 0 1 1.067-.069l.109.069 2.853 2.073a1 1 0 0 1 .395.993l-.032.125-1.09 3.354a1 1 0 0 1-.834.684l-.117.007h-3.526a1 1 0 0 1-.909-.582l-.042-.109-1.09-3.354a1 1 0 0 1 .264-1.036l.1-.082 2.852-2.073Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={isSelected ? 'white' : '#797979'} d="M0 .5h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Football;
