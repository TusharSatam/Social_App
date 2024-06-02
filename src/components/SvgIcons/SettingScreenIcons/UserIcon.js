import * as React from "react"
import Svg, {Path} from 'react-native-svg';

const UserIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF4D67"
      d="M9 .5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.751.751 0 0 1-1.438.334.75.75 0 0 1-.061-.29 7.5 7.5 0 0 0-14.993 0 .75.75 0 1 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 9 .5ZM5 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
    />
  </Svg>
)
export default UserIcon
