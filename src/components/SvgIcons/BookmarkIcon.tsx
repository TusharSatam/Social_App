import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const BookmarkIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 18 20"
        fill="none"
        {...props}>
        <Path
            stroke="#242424"
            strokeWidth={1.6}
            d="M1.169 7.373c0-2.768 0-4.153.86-5.013.86-.86 2.245-.86 5.013-.86h3.916c2.768 0 4.153 0 5.013.86.86.86.86 2.245.86 5.013v6.684c0 2.626 0 3.94-.826 4.341-.827.402-1.86-.41-3.925-2.032l-.661-.52c-1.161-.912-1.743-1.368-2.419-1.368-.677 0-1.258.456-2.419 1.369l-.662.518C3.854 17.988 2.822 18.8 1.995 18.4c-.826-.402-.826-1.716-.826-4.342V7.373Z"
        />
    </Svg>
);
export default BookmarkIcon;
