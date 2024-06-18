import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const ThreeDot = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 16 4"
        fill="none"
        {...props}>
        <Path
            fill="#262626"
            fillRule="evenodd"
            d="M1.714 0a1.714 1.714 0 1 1 0 3.429 1.714 1.714 0 0 1 0-3.429ZM8 0a1.714 1.714 0 1 1 0 3.429A1.714 1.714 0 0 1 8 0Zm6.286 0a1.714 1.714 0 1 1 0 3.429 1.714 1.714 0 0 1 0-3.429Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default ThreeDot;
