import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const PlayButtonIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 35 41"
        fill="none"
        {...props}>
        <Path
            fill={props?.fill ?? "#fff"}
            d="m.39.985 34.453 19.89L.39 40.767V.985Z"
        />
    </Svg>
);
export default PlayButtonIcon;
