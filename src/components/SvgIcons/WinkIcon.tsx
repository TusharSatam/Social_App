import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";
const WinkIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        viewBox="0 0 37 37"
        height={24}
        fill="none"
        {...props}>
        <G clipPath="url(#a)">
            <Path
                fill="#FFCC4D"
                d="M36.78 18.746c0 9.941-8.06 18-18 18s-18-8.059-18-18c0-9.94 8.06-18 18-18s18 8.06 18 18Z"
            />
            <Path
                fill="#66471B"
                d="M16.236 16.56c-.06-.134-1.499-3.296-4.457-3.296-2.957 0-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605c.013-.01 1.262-.902 3.703-.902 2.426 0 3.674.88 3.702.9a.496.496 0 0 0 .61-.01.5.5 0 0 0 .145-.593Z"
            />
            <Path
                fill="#F5F8FA"
                d="M31.78 14.246a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
            />
            <Path
                fill="#292F33"
                d="M25.28 16.746a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            />
            <Path
                fill="#66471B"
                d="M7.78 22.008c0 3.964 4.595 9 11 9 6.403 0 11-5 11-9 0 0-10.334 2.756-22 0Z"
            />
            <Path
                fill="#E8596E"
                d="m19.324 24.351-1.09-.005c-3.217-.074-5.455-.596-5.455-.596v6.961c0 3 2 6 6 6s6-3 6-6v-6.92a28.815 28.815 0 0 1-5.455.56Z"
            />
            <Path
                fill="#DD2F45"
                d="M18.78 32.59a.545.545 0 0 0 .544-.545V24.35l-1.09-.005v7.699a.546.546 0 0 0 .545.545Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.78.746h36v36h-36z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default WinkIcon;
