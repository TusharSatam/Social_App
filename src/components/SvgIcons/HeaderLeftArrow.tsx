import * as React from "react";
import Svg, {Path} from "react-native-svg";

function HeaderLeftArrow(props) {
    return (
        <Svg
            width={20}
            height={17}
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path
                d="M19.25 8.575c0 .443-.329.81-.756.867l-.119.008H.875a.875.875 0 01-.118-1.742L.876 7.7h17.5c.483 0 .874.392.874.875z"
                fill="#212121"
            />
            <Path
                d="M8.55 14.984a.875.875 0 01-1.136 1.325l-.098-.085L.258 9.196a.875.875 0 01-.086-1.142l.086-.098L7.316.926a.875.875 0 011.32 1.143l-.085.098-6.436 6.41 6.436 6.407z"
                fill="#212121"
            />
        </Svg>
    );
}

export default HeaderLeftArrow;
