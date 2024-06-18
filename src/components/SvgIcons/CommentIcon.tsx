import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";
const CommentIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 20 20"
        fill="none"
        {...props}>
        <Path
            fill="#000"
            stroke="#fff"
            strokeWidth={0.15}
            d="M9.189 16.204v-.075H5.568a1.698 1.698 0 0 1-1.698-1.697V5.568A1.698 1.698 0 0 1 5.568 3.87h12.41a1.698 1.698 0 0 1 1.697 1.698v8.864a1.698 1.698 0 0 1-1.698 1.697H14.313l-.023.023-3.278 3.287a.828.828 0 0 1-.569.236H10a.812.812 0 0 1-.811-.811v-2.66Zm4.458-1.697h4.405V5.493H5.493v9.014H10.811v2.835l.128-.127 2.708-2.708ZM1.947 2.023v10.561H.326V2.023A1.698 1.698 0 0 1 2.023.325H16.13v1.623H1.948v.075Z"
        />
    </Svg>
);
export default CommentIcon;
