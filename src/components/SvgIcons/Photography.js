

import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Photography = ({isSelected}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={17}
    fill="none"
  >
    <Path
      fill={isSelected?"white":"#797979"}
      d="M7.125.917 5.371 2.833H2.333A1.922 1.922 0 0 0 .417 4.75v11.5c0 1.054.862 1.916 1.916 1.916h15.334a1.922 1.922 0 0 0 1.916-1.916V4.75a1.922 1.922 0 0 0-1.916-1.917h-3.038L12.875.917h-5.75ZM10 15.29A4.793 4.793 0 0 1 5.208 10.5 4.793 4.793 0 0 1 10 5.708a4.793 4.793 0 0 1 4.792 4.792A4.793 4.793 0 0 1 10 15.29Z"
    />
  </Svg>
)
export default Photography
