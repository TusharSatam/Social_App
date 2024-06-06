import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const HeaderCross = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 13 14"
        {...props}>
        <Path
            fill={props.fill ?? "#000"}
            d="M.273.348a.928.928 0 0 1 1.314 0L6.5 5.263 11.413.348a.93.93 0 1 1 1.315 1.315L7.813 6.575l4.915 4.913a.928.928 0 1 1-1.315 1.315L6.5 7.888l-4.913 4.915A.928.928 0 0 1 .071 12.5a.93.93 0 0 1 .202-1.013l4.915-4.913L.273 1.663a.928.928 0 0 1 0-1.315Z"
        />
    </Svg>
);
export default HeaderCross;
