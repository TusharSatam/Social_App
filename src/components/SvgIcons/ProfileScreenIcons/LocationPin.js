import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const LocationPin = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#D5DEE4"
        d="M8.957 16.267c-.418 0-.57-.339-.57-.757L8.2 5.408a.757.757 0 1 1 1.514 0L9.526 15.51c0 .418-.151.757-.57.757Z"
      />
      <Path
        fill="#BCCBD3"
        d="M8.957 4.65a.757.757 0 0 0-.757.758l.054 2.95a3.117 3.117 0 0 0 1.405 0l.055-2.95a.757.757 0 0 0-.757-.758Z"
      />
      <Path
        fill="#FF473E"
        d="M8.957 7.469a3.469 3.469 0 1 0 0-6.938 3.469 3.469 0 0 0 0 6.938Z"
      />
      <Path
        fill="#FD7085"
        d="M6.473 3.244c.274.181.747-.05 1.056-.516.309-.467.336-.993.062-1.174-.275-.182-.748.049-1.056.516-.31.467-.337.992-.062 1.174Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.957.5h16v16h-16z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default LocationPin
