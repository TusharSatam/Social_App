import * as React from "react";
import Svg, {Path} from "react-native-svg";

function CameraIcon(props) {
    return (
        <Svg
            width={20}
            height={18}
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path
                d="M17.5 2.744h-2.599L13.623.828A.749.749 0 0013 .494H7a.75.75 0 00-.623.334l-1.28 1.916H2.5a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-10.5a2.25 2.25 0 00-2.25-2.25zm.75 12.75a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75v-10.5a.75.75 0 01.75-.75h3a.75.75 0 00.624-.334l1.277-1.916h5.197l1.278 1.916a.75.75 0 00.624.334h3a.75.75 0 01.75.75v10.5zM10 5.744a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zm0 6.75a2.625 2.625 0 110-5.249 2.625 2.625 0 010 5.25z"
                fill="#000"
            />
        </Svg>
    );
}

export default CameraIcon;
