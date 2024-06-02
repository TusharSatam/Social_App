import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ForwordIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      stroke="#FF4D67"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1 13.25 7.25 7 1 .75"
    />
  </Svg>
)
export default ForwordIcon
