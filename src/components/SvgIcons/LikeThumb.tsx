import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const LikeThumb = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 22 20"
        fill={"none"}
        {...props}>
        <Path
            fill={props.fill ?? "#242424"}
            stroke={props.stroke ?? "#fff"}
            strokeWidth={0.2}
            d="m7.027 7.029.001-.001 5.961-5.97.901.9c.23.23.373.542.374.888l-.026.283-.87 4.183-.025.12h5.907a1.733 1.733 0 0 1 1.733 1.734v1.833c0 .225-.043.432-.12.632l-2.768 6.46v.002a1.72 1.72 0 0 1-1.595 1.056H8.25a1.734 1.734 0 0 1-1.733-1.733V8.249c0-.477.19-.91.51-1.22ZM8.15 17.416v.1H16.594l.025-.06 2.723-6.418.008-.018V9.066h-8.034l1.01-4.756.07-.33-.239.239L8.18 8.206l-.029.03v9.18ZM4.483 8.349v10.8H1.017V8.35h3.466Z"
        />
    </Svg>
);
export default LikeThumb;
