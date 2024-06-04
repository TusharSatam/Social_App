import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const HeaderRightArrow = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 17"
        {...props}>
        <Path
            fill="#212121"
            d="M.75 8.576c0-.443.329-.809.756-.867l.119-.008h17.5a.875.875 0 0 1 .118 1.742l-.118.008h-17.5a.875.875 0 0 1-.875-.875Z"
        />
        <Path
            fill="#212121"
            d="M11.45 2.167A.875.875 0 0 1 12.585.843l.098.084 7.058 7.028c.313.311.341.799.086 1.142l-.085.098-7.059 7.03a.875.875 0 0 1-1.32-1.143l.085-.098 6.436-6.409-6.436-6.408Z"
        />
    </Svg>
);
export default HeaderRightArrow;
