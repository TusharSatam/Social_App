import Svg, { Path } from "react-native-svg"
const SavedTabIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.isActive?"black":"#797979"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.342 17.342h0l-6.014 3.436V2.5a1.5 1.5 0 0 1 1.5-1.5h12.5a1.5 1.5 0 0 1 1.5 1.5V20.78l-6.014-3.437h0a3.5 3.5 0 0 0-3.472 0Zm9.487 4.084v-.002.002Z"
    />
  </Svg>
)
export default SavedTabIcon
