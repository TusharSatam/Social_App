import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BookIcon = ({isSelected}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={21}
    fill="none"
  >
    <Path
      fill={isSelected?"white":"#797979"}
      d="M3 .5A2.5 2.5 0 0 0 .5 3v15A2.5 2.5 0 0 0 3 20.5h13.25a.75.75 0 1 0 0-1.5H3a1 1 0 0 1-1-1h14.25a.75.75 0 0 0 .75-.75V3A2.5 2.5 0 0 0 14.5.5H3Zm1.5 3h8a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1Z"
    />
  </Svg>
)
export default BookIcon
