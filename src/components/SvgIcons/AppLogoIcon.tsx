import * as React from "react";
import Svg, {
    SvgProps,
    Path,
    G,
    Mask,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const AppLogoIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 30 30"
        fill="none"
        {...props}>
        <Path
            fill="url(#a)"
            d="M22.211.037H7.666A7.272 7.272 0 0 0 .394 7.31v14.545a7.272 7.272 0 0 0 7.272 7.272h14.545a7.273 7.273 0 0 0 7.273-7.272V7.31A7.273 7.273 0 0 0 22.21.037Z"
        />
        <G filter="url(#b)">
            <Mask
                id="c"
                width={20}
                height={19}
                x={5}
                y={5}
                maskUnits="userSpaceOnUse"
                style={{
                    maskType: "luminance",
                }}>
                <Path
                    fill="#fff"
                    d="M24.03 14.589a9.09 9.09 0 1 0-18.182 0 9.09 9.09 0 0 0 18.182 0Z"
                />
            </Mask>
            <G mask="url(#c)">
                <Path
                    fill="#fff"
                    fillOpacity={0.01}
                    d="M24.03 14.589a9.09 9.09 0 1 0-18.182 0 9.09 9.09 0 0 0 18.182 0Z"
                />
                <Path
                    fill="#fff"
                    d="M14.939 23.68a9.09 9.09 0 1 0 0-18.182 9.09 9.09 0 0 0 0 18.181Z"
                />
                <Path
                    fill="url(#d)"
                    d="M14.939 20.044a5.454 5.454 0 1 0 0-10.91 5.454 5.454 0 0 0 0 10.91Z"
                />
                <Path
                    fill="#fff"
                    d="M17.656 15.341a2.782 2.782 0 1 1-3.47-3.47.215.215 0 0 1 .27.153.214.214 0 0 1-.003.114 2.356 2.356 0 0 0 2.937 2.938.215.215 0 0 1 .27.152.213.213 0 0 1-.003.115v-.002Z"
                />
            </G>
        </G>
        <Defs>
            <LinearGradient
                id="a"
                x1={0.394}
                x2={29.484}
                y1={13.397}
                y2={12.957}
                gradientUnits="userSpaceOnUse">
                <Stop stopColor="#FF4D67" stopOpacity={0.7} />
                <Stop offset={1} stopColor="#FF4D67" />
            </LinearGradient>
            <LinearGradient
                id="d"
                x1={9.845}
                x2={20.393}
                y1={14.296}
                y2={14.589}
                gradientUnits="userSpaceOnUse">
                <Stop stopColor="#FF7B8D" />
                <Stop offset={1} stopColor="#FF5971" />
            </LinearGradient>
        </Defs>
    </Svg>
);
export default AppLogoIcon;
