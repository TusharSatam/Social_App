import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CloseSearchIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      fill="#797979"
      d="M.839 1.186a.786.786 0 0 1 1.112 0l4.157 4.159 4.157-4.16a.786.786 0 1 1 1.113 1.113L7.219 6.455l4.159 4.157a.786.786 0 1 1-1.113 1.113L6.108 7.566l-4.157 4.159A.787.787 0 0 1 .84 10.612l4.159-4.157-4.16-4.157a.786.786 0 0 1 0-1.112Z"
    />
  </Svg>
)
export default CloseSearchIcon
