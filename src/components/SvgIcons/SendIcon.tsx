import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const SendIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 16 17"
        fill="none"
        {...props}>
        <Path
            fill="#262626"
            fillRule="evenodd"
            d="M15.405 7.892 2.418 16.54a.553.553 0 0 1-.85-.566l1.493-7.689-.005-.028a.56.56 0 0 1 .001-.09L.504.75A.553.553 0 0 1 1.269.07l14.072 6.863c.384.188.42.721.064.958Zm-2.322.217-8.982.628-1.194 6.147L13.083 8.11ZM1.985 1.65l10.983 5.356-8.924.624-2.06-5.98Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default SendIcon;
