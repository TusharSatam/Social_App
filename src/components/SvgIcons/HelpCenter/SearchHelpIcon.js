import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SearchHelpIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke="#FF4D67"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M13.55 13.444 17.107 17m-16-8.889a7.111 7.111 0 1 0 14.222 0 7.111 7.111 0 0 0-14.222 0Z"
    />
  </Svg>
)
export default SearchHelpIcon
