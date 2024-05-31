import * as React from "react";
import Svg, {SvgProps, Circle, Path} from "react-native-svg";
const PlayIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 24"
        {...props}>
        <Circle cx={12} cy={12} r={10} stroke="#A7A7A7" strokeWidth={1.5} />
        <Path
            stroke="#A7A7A7"
            strokeWidth={1.5}
            d="M15.414 10.941c.781.462.781 1.656 0 2.118l-4.72 2.787C9.934 16.294 9 15.71 9 14.786V9.214c0-.924.934-1.507 1.694-1.059l4.72 2.787Z"
        />
    </Svg>
);
export default PlayIcon;
