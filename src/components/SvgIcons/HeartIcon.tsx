import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const HeartIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 37 33"
        fill="none"
        {...props}>
        <Path
            fill="#DD2E44"
            d="M36.664 10.579c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129C16.99 2.344 14.07.71 10.762.71 5.312.71.894 5.129.894 10.58c0 .772.098 1.52.266 2.24 1.37 8.514 10.835 17.495 17.62 19.96 6.782-2.465 16.248-11.446 17.616-19.958.17-.721.268-1.47.268-2.242Z"
        />
    </Svg>
);
export default HeartIcon;
