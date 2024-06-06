import * as React from "react";
import Svg, {Path} from "react-native-svg";

function LocationIcon(props) {
    return (
        <Svg
            width={24}
            height={25}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path
                d="M12 1.98a8.26 8.26 0 00-8.25 8.25 8.175 8.175 0 001.662 4.95s.225.296.262.338L12 22.98l6.33-7.465.258-.335v-.003a8.175 8.175 0 001.662-4.947A8.26 8.26 0 0012 1.98zm0 11.25a3 3 0 110-6.001 3 3 0 010 6z"
                fill="#FF4D67"
            />
        </Svg>
    );
}

export default LocationIcon;
