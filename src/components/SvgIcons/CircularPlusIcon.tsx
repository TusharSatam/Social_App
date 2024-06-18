import * as React from "react";
import Svg, {
    SvgProps,
    Rect,
    Path,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg";
const CircularPlusIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 60 60"
        fill="none"
        {...props}>
        <Rect width={60} height={60} fill="url(#a)" rx={30} />
        <Path
            fill="#F6F6F6"
            d="M30 22a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6h-6a1 1 0 0 1 0-2h6v-6a1 1 0 0 1 1-1Z"
        />
        <Defs>
            <LinearGradient
                id="a"
                x1={53.491}
                x2={6.779}
                y1={12.168}
                y2={47.688}
                gradientUnits="userSpaceOnUse">
                <Stop stopColor="#FF4D67" />
                <Stop offset={1} stopColor="#D9235D" />
            </LinearGradient>
        </Defs>
    </Svg>
);
export default CircularPlusIcon;
