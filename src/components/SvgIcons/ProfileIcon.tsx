import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const ProfileIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill={"#A7A7A7"}
        viewBox="0 -2.93 32.537 32.537"
        {...props}>
        <Path
            fill={"#A7A7A7"}
            d="M31.537 26.679a.991.991 0 0 1-.676-.264 21.817 21.817 0 0 0-29.2-.349 1 1 0 1 1-1.322-1.5 23.814 23.814 0 0 1 31.875.377 1 1 0 0 1-.677 1.736Z"
        />
        <Path d="M16.8 2a7.949 7.949 0 1 1-7.949 7.95A7.959 7.959 0 0 1 16.8 2m0-2a9.949 9.949 0 1 0 9.95 9.95A9.949 9.949 0 0 0 16.8 0Z" />
    </Svg>
);
export default ProfileIcon;
