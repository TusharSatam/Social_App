import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const HomeIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 23 24"
        fill="none"
        {...props}>
        <Path
            fill={props.fill ?? "#242424"}
            stroke={props.stroke ?? "#242424"}
            strokeLinejoin="round"
            strokeWidth={props.strokeWidth ?? 2}
            d="M8.167 2H2.61a1.111 1.111 0 0 0-1.11 1.111v5.556a1.111 1.111 0 0 0 1.11 1.11h5.556a1.111 1.111 0 0 0 1.11-1.11V3.11A1.111 1.111 0 0 0 8.168 2Zm0 12.222H2.61a1.111 1.111 0 0 0-1.11 1.111v5.556A1.111 1.111 0 0 0 2.61 22h5.556a1.111 1.111 0 0 0 1.11-1.111v-5.556a1.11 1.11 0 0 0-1.11-1.11ZM20.389 2h-5.555a1.111 1.111 0 0 0-1.112 1.111v5.556a1.111 1.111 0 0 0 1.112 1.11h5.555a1.111 1.111 0 0 0 1.111-1.11V3.11A1.111 1.111 0 0 0 20.39 2Zm0 12.222h-5.555a1.111 1.111 0 0 0-1.112 1.111v5.556A1.111 1.111 0 0 0 14.834 22h5.555a1.111 1.111 0 0 0 1.111-1.111v-5.556a1.11 1.11 0 0 0-1.111-1.11Z"
        />
    </Svg>
);
export default HomeIcon;
