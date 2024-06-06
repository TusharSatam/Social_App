import * as React from "react";
import Svg, {Path} from "react-native-svg";
const LogoutIcon = props => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}>
        <Path
            fill="#FF4D67"
            d="M12 3.25a.75.75 0 1 1 0 1.5 7.25 7.25 0 0 0 0 14.5.75.75 0 1 1 0 1.5 8.75 8.75 0 0 1 0-17.5Z"
        />
        <Path
            fill="#FF4D67"
            d="M16.47 9.53a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H10a.75.75 0 1 1 0-1.5h8.19l-1.72-1.72Z"
        />
    </Svg>
);
export default LogoutIcon;