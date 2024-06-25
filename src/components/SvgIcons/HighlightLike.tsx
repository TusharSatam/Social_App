import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const HighlightLike = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 22 19"
        {...props}>
        <Path
            fill="#3467CE"
            d="M21.035 8.666A1.833 1.833 0 0 0 19.2 6.833h-5.793l.88-4.19a1.52 1.52 0 0 0 .027-.293 1.38 1.38 0 0 0-.403-.971L12.94.416 6.91 6.448c-.34.339-.541.797-.541 1.301v9.167A1.833 1.833 0 0 0 8.2 18.749h8.25c.761 0 1.412-.458 1.687-1.118l2.768-6.463c.083-.21.129-.43.129-.669V8.666ZM.867 18.749h3.667v-11H.868v11Z"
        />
    </Svg>
);
export default HighlightLike;
