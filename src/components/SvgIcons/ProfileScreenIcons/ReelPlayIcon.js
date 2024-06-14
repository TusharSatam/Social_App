import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      d="M9.552 7.47a1.5 1.5 0 0 0 0-2.58L3.468 1.276A1.5 1.5 0 0 0 1.2 2.566v7.228a1.5 1.5 0 0 0 2.267 1.29l6.084-3.615Z"
    />
  </Svg>
)
export default SvgComponent
