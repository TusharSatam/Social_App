import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BackIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="#212121"
      d="M19.25 8.412c0 .443-.329.81-.756.867l-.119.008H.875a.875.875 0 0 1-.118-1.742l.118-.008h17.5c.484 0 .875.392.875.875Z"
    />
    <Path
      fill="#212121"
      d="M8.55 14.82a.875.875 0 0 1-1.136 1.325l-.098-.084L.258 9.033a.875.875 0 0 1-.086-1.142l.085-.098L7.316.763a.875.875 0 0 1 1.32 1.143l-.085.098-6.436 6.41 6.436 6.407Z"
    />
  </Svg>
)
export default BackIcon
