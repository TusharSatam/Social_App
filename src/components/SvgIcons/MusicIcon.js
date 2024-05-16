import React from 'react'
import Svg, { Path } from "react-native-svg"
const MusicIcon = ({isSelected}) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
  >
    <Path
      fill={isSelected?"white":"#797979"}
      d="M21.5 3.5V16a3.5 3.5 0 1 1-2-3.16V6.97L9.5 9.1V18a3.5 3.5 0 1 1-2-3.16V6.5l14-3Z"
    />
  </Svg>
  )
}

export default MusicIcon