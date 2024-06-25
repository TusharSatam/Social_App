import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";
const RedLike = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 13 13"
        fill="none"
        {...props}>
        <G clipPath="url(#a)">
            <Path
                fill="#DD2E44"
                d="M12.949 4.444a3.29 3.29 0 0 0-3.289-3.29 3.283 3.283 0 0 0-2.673 1.377 3.283 3.283 0 0 0-2.672-1.377 3.29 3.29 0 0 0-3.29 3.29c0 .257.033.506.09.747.456 2.837 3.611 5.831 5.872 6.653 2.261-.822 5.417-3.816 5.873-6.653.056-.24.089-.49.089-.747Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.987.5h12v12h-12z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default RedLike;
