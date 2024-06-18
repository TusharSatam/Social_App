import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const LikeHeartIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 13 12"
        fill="none"
        {...props}>
        <Path
            fill="#262626"
            fillRule="evenodd"
            d="m6.431 1.92-.35-.41C4.67.1 2.424.197 1.015 1.606c-1.41 1.41-1.138 4.134.271 5.543.572.572 1.429 1.364 2.57 2.376l.96.844 1.078.936a.802.802 0 0 0 1.037.01l.873-.733c1.53-1.293 2.665-2.31 3.406-3.055l.192-.196.172-.182c1.313-1.415 1.65-4.166.274-5.543l-.1-.096c-1.415-1.312-3.55-1.376-4.926 0l-.391.41Zm-4.85.253c1.115-1.114 2.839-1.167 3.912-.117l.905 1.058 1.004-1.05c1.03-1.03 2.67-1.014 3.8.034l.09.086c.972.972.806 3.22-.306 4.42l-.167.176-.185.189c-.614.616-1.524 1.442-2.724 2.47l-.623.53-.87.729-1.076-.934-.77-.677a73.063 73.063 0 0 1-2.51-2.3l-.208-.205C.693 5.42.547 3.208 1.582 2.173Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default LikeHeartIcon;
