import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 29 28"
        {...props}>
        <Path
            stroke={"#797979"}
            strokeWidth={1.9}
            d="M17.57 21.673c-6.923 2.766-10.385 4.152-12.36 2.81a4.496 4.496 0 0 1-1.192-1.192c-1.343-1.977.041-5.439 2.81-12.36.59-1.476.886-2.214 1.393-2.794.13-.147.269-.286.416-.416.58-.507 1.318-.803 2.794-1.393 6.921-2.769 10.383-4.153 12.36-2.81.468.32.872.723 1.191 1.192 1.343 1.976-.042 5.437-2.81 12.36-.59 1.475-.886 2.213-1.393 2.793-.13.148-.268.286-.416.416-.58.507-1.317.803-2.794 1.394Z"
        />
        <Path
            stroke={props.stroke ?? "#797979"}
            strokeWidth={1.9}
            d="M14.5 17.301a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z"
        />
    </Svg>
);
export default SvgComponent;
