import * as React from "react"
import Svg, { Circle } from "react-native-svg"
const Dot = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={5}
    height={6}
    fill="none"
    {...props}
  >
    <Circle cx={2.5} cy={3.344} r={2.5} fill="#FF4D67" />
  </Svg>
)
export default Dot
