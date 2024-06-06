import * as React from "react";
import Svg, {Path} from "react-native-svg";

function ChevronRightIcon(props) {
    return (
        <Svg
            width={9}
            height={15}
            viewBox="0 0 9 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path
                d="M1.667 13.313L7.5 7.48 1.667 1.646"
                stroke="#FF4D67"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default ChevronRightIcon;
