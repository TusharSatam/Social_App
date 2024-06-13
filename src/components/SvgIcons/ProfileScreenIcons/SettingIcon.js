import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SettingIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <G fill="#000" clipPath="url(#a)">
      <Path d="M12.57 7.639a4.831 4.831 0 0 0-4.862 4.86 4.831 4.831 0 0 0 4.861 4.862A4.831 4.831 0 0 0 17.43 12.5a4.831 4.831 0 0 0-4.86-4.861Zm0 8.333A3.439 3.439 0 0 1 9.096 12.5a3.438 3.438 0 0 1 3.472-3.472 3.438 3.438 0 0 1 3.473 3.472 3.438 3.438 0 0 1-3.473 3.472Z" />
      <Path d="m22.778 10.208-1.945-.625-.416-1.042.972-1.805a1.168 1.168 0 0 0-.208-1.32L19.514 3.75a1.168 1.168 0 0 0-1.32-.209l-1.805.973-1.042-.417-.625-1.944c-.139-.417-.555-.764-1.041-.764H11.32a.974.974 0 0 0-.973.833l-.625 1.944c-.416.07-.764.209-1.11.417l-1.806-.972a1.168 1.168 0 0 0-1.32.208L3.82 5.486a1.168 1.168 0 0 0-.208 1.32l.903 1.735c-.139.348-.278.764-.417 1.112l-1.944.625c-.417.138-.764.555-.764 1.041v2.361c0 .486.347.903.833 1.042l1.945.625.416 1.042-.972 1.805c-.208.417-.139.972.208 1.32l1.667 1.666c.347.348.903.417 1.32.209l1.805-.973 1.042.417.625 2.014c.139.417.555.764 1.041.764h2.362c.486 0 .902-.347 1.041-.764l.625-2.014 1.042-.417 1.806.973c.416.208.972.139 1.319-.209l1.667-1.666c.347-.348.416-.903.208-1.32l-.972-1.805.416-1.042 2.014-.625c.417-.139.764-.556.764-1.042v-2.36c0-.487-.347-.973-.833-1.112Zm-.556 3.264-2.5.764-.07.347-.624 1.458-.208.348 1.25 2.291-1.39 1.39-2.291-1.25-.347.208a6.597 6.597 0 0 1-1.459.625l-.347.069-.764 2.5h-1.944l-.764-2.5-.347-.07-1.459-.624-.347-.209-2.292 1.25-1.388-1.389 1.25-2.291-.209-.348a6.592 6.592 0 0 1-.625-1.458l-.07-.347-2.5-.764v-1.944l2.362-.695.139-.347a5.895 5.895 0 0 1 .625-1.528l.208-.347-1.18-2.292L6.319 4.93l2.223 1.25.347-.208a5.894 5.894 0 0 1 1.528-.625l.347-.139.764-2.43h1.944l.764 2.43.347.139c.486.139.973.347 1.459.625l.347.208 2.292-1.25 1.389 1.39-1.25 2.29.208.348c.278.486.486.972.625 1.458l.07.348 2.5.764v1.944Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h25v25H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SettingIcon
