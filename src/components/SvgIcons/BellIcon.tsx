import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const BellIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 19 23"
        {...props}>
        <Path
            stroke={props.stroke ?? "#000"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12.67 17.838v.792a3.17 3.17 0 0 1-6.339 0v-.792m11.67-1.613c-1.27-1.557-2.169-2.349-2.169-6.64 0-3.93-2.006-5.329-3.658-6.009a.882.882 0 0 1-.492-.522c-.29-.986-1.102-1.855-2.182-1.855-1.08 0-1.892.87-2.178 1.856-.067.227-.274.431-.493.521-1.654.681-3.658 2.076-3.658 6.01-.003 4.29-.9 5.082-2.172 6.639-.527.645-.065 1.613.856 1.613h15.296c.916 0 1.375-.971.85-1.613Z"
        />
    </Svg>
);
export default BellIcon;
