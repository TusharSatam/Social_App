import {Path, Svg} from "react-native-svg";
const HelpIcon = props => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}>
        <Path
            fill="#FF4D67"
            d="M10 19.51C4.756 19.51.49 15.244.49 10S4.756.49 10 .49s9.51 4.266 9.51 9.51-4.266 9.51-9.51 9.51ZM10 1.85c-4.497 0-8.151 3.654-8.151 8.151S5.503 18.152 10 18.152s8.151-3.655 8.151-8.152S14.497 1.85 10 1.85Z"
        />
    </Svg>
);
export default HelpIcon;
