import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";
const AmazedIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 37 37"
        fill="none"
        {...props}>
        <G clipPath="url(#a)">
            <Path
                fill="#FFCC4D"
                d="M36.78 18.746c0 9.941-8.06 18-18 18-9.942 0-18-8.059-18-18 0-9.94 8.058-18 18-18 9.94 0 18 8.06 18 18Z"
            />
            <Path
                fill="#664500"
                d="M18.78 22.595c-2.967 0-4.936-.346-7.37-.82-.557-.105-1.638 0-1.638 1.639 0 3.275 3.763 7.369 9.007 7.369s9.007-4.094 9.007-7.37c0-1.637-1.082-1.744-1.638-1.637-2.434.473-4.402.819-7.369.819Z"
            />
            <Path
                fill="#DD2E44"
                d="M17.43 4.027a4.666 4.666 0 0 0-8.884.254A4.666 4.666 0 0 0 4.32 3.7a4.67 4.67 0 0 0-2.849 5.956c.122.344.284.663.472.958 1.951 3.582 7.588 6.1 11.001 6.13 2.637-2.166 5.446-7.664 4.718-11.676a4.712 4.712 0 0 0-.233-1.042Zm2.7 0a4.67 4.67 0 0 1 5.955-2.85 4.67 4.67 0 0 1 2.93 3.104 4.666 4.666 0 0 1 4.224-.58 4.671 4.671 0 0 1 2.85 5.956 4.72 4.72 0 0 1-.473.958c-1.95 3.582-7.588 6.1-11.002 6.13-2.637-2.166-5.445-7.664-4.717-11.676.037-.348.112-.698.232-1.042Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.78.746h36v36h-36z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default AmazedIcon;
