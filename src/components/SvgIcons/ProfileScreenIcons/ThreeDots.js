import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ThreeDots = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={5}
    fill="none"
    {...props}
  >
    <Path
      fill="#262626"
      fillRule="evenodd"
      d="M2.5.25a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2Zm7.7 0a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2Zm7.7 0a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default ThreeDots
