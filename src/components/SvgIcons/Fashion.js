import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Fashion = ({isSelected}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={19}
    fill="none"
  >
    <Path
      fill={isSelected?"white":"#797979"}
      d="M12.883.507 12.978.5l.112.004.113.017.113.03 6 2a1 1 0 0 1 .677.833L20 3.5v5a1 1 0 0 1-.883.993L19 9.5h-2v7a2 2 0 0 1-1.85 1.995L15 18.5H5a2 2 0 0 1-1.995-1.85L3 16.5v-7H1a1 1 0 0 1-.993-.883L0 8.5v-5a1 1 0 0 1 .576-.906l.108-.043 6-2A1 1 0 0 1 8 1.501a2 2 0 0 0 3.995.15l.009-.24.017-.114.037-.134.044-.103.05-.092.068-.093.069-.08c.055-.053.114-.1.175-.14l.096-.053.103-.044.108-.032.112-.019Z"
    />
  </Svg>
)
export default Fashion
