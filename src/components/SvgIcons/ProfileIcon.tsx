import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const ProfileIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        viewBox="0 0 25 24"
        height={24}
        fill="none"
        {...props}>
        <Path
            fill={props.fill ?? "#797979"}
            fillRule="evenodd"
            d="M16.863 8.727a4.364 4.364 0 1 1-8.727 0 4.364 4.364 0 0 1 8.727 0Zm-2.181 0a2.182 2.182 0 1 1-4.364 0 2.182 2.182 0 0 1 4.364 0Z"
            clipRule="evenodd"
        />
        <Path
            fill={props.fill ?? "#797979"}
            stroke="#fff"
            strokeWidth={0.1}
            d="M12.57 16.314a7.678 7.678 0 0 0-6.299 3.28l-.026.039.036.03a9.828 9.828 0 0 0 6.219 2.205 9.83 9.83 0 0 0 6.31-2.28l.035-.03-.027-.038a7.676 7.676 0 0 0-6.247-3.206Zm0 0v.05-.05Zm-7.846 1.763.04.05.039-.05a9.754 9.754 0 0 1 7.768-3.845 9.75 9.75 0 0 1 7.697 3.753l.04.051.04-.052a9.869 9.869 0 1 0-15.624.093ZM.55 12C.55 5.4 5.9.05 12.5.05S24.45 5.4 24.45 12 19.1 23.95 12.5 23.95.55 18.6.55 12Z"
        />
    </Svg>
);
export default ProfileIcon;
