import * as React from "react";
import Svg, {Path} from "react-native-svg";

const PasswordManager = props => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}>
        <Path
            fill="#FF4D67"
            d="M13.396.49a6.112 6.112 0 0 0-5.85 7.888L.489 15.434v4.076h4.076l7.056-7.056A6.114 6.114 0 1 0 13.396.49Zm0 10.869c-.468 0-.933-.07-1.38-.205l-.78-.237-.575.576-2.16 2.16-.938-.936-.96.96.937.938-1.078 1.077-.937-.937-.96.96.937.938-1.5 1.499H1.849v-2.155l6.658-6.658.576-.576-.236-.779a4.755 4.755 0 1 1 4.55 3.375Z"
        />
    </Svg>
);
export default PasswordManager;
