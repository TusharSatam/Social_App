import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const ShareIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 18 20"
        fill="none"
        {...props}>
        <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M12 4 9 1m0 0L6 4m3-3v12M3 8H1v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8h-2"
        />
    </Svg>
);
export default ShareIcon;
