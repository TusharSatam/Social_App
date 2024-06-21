import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";
const FireIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        viewBox="0 0 21 21"
        height={24}
        fill="none"
        {...props}>
        <G clipPath="url(#a)">
            <Path
                fill="#F4900C"
                d="M19.945 10.629a9.422 9.422 0 0 0-.578-3.26c-.256 2.994-1.852 4.532-3.52 3.816-1.562-.672-.51-3.288-.431-4.536.13-2.116-.007-4.538-3.85-6.552 1.596 3.055.184 4.954-1.297 5.07-1.643.127-3.148-1.413-2.593-3.913-1.799 1.325-1.85 3.557-1.296 5 .579 1.504-.023 2.754-1.435 2.893-1.578.156-2.454-1.69-1.646-4.63A9.444 9.444 0 0 0 10.5 20.074a9.444 9.444 0 0 0 9.445-9.444Z"
            />
            <Path
                fill="#FFCC4D"
                d="M16.275 13.406c.082 1.713-1.423 2.385-2.233 2.06-1.17-.468-.856-1.272-1.157-2.939-.301-1.666-1.459-2.824-3.171-3.333 1.25 3.518-.693 4.815-1.712 5.046-1.04.237-2.085 0-2.204-2.226a6.647 6.647 0 0 0-1.934 5.332 9.41 9.41 0 0 0 6.636 2.727 9.41 9.41 0 0 0 6.636-2.727 6.63 6.63 0 0 0-.862-3.94Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.5.073h20v20H.5z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default FireIcon;
