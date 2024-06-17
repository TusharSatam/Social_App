import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const DefaultProfileIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.height?props.height:72}
    height={props.height?props.height:73}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#FF4D67"
        d="M36 39.5c7.188 0 13.725 2.082 18.534 5.016 2.4 1.464 4.452 3.192 5.934 5.07C61.926 51.431 63 53.639 63 56c0 2.535-1.233 4.533-3.009 5.958-1.68 1.35-3.897 2.244-6.252 2.868C49.005 66.077 42.687 66.5 36 66.5c-6.687 0-13.005-.42-17.739-1.674-2.355-.624-4.572-1.518-6.252-2.868C10.23 60.53 9 58.535 9 56c0-2.361 1.074-4.569 2.532-6.417 1.482-1.875 3.531-3.6 5.934-5.07C22.275 41.585 28.815 39.5 36 39.5Zm0-33a15 15 0 1 1 0 30 15 15 0 0 1 0-30Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h72v72H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default DefaultProfileIcon
